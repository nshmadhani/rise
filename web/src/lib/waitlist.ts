import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type WaitlistEntry = {
  email: string;
  createdAt: string;
  source?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const WAITLIST_FILE = path.join(DATA_DIR, "waitlist.json");

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function readLocal(): Promise<WaitlistEntry[]> {
  try {
    const raw = await readFile(WAITLIST_FILE, "utf8");
    return JSON.parse(raw) as WaitlistEntry[];
  } catch {
    return [];
  }
}

async function writeLocal(entries: WaitlistEntry[]) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(WAITLIST_FILE, JSON.stringify(entries, null, 2), "utf8");
  const csv =
    "email,createdAt,source\n" +
    entries
      .map(
        (e) =>
          `${JSON.stringify(e.email)},${e.createdAt},${JSON.stringify(e.source ?? "landing")}`,
      )
      .join("\n") +
    "\n";
  await writeFile(path.join(DATA_DIR, "waitlist.csv"), csv, "utf8");
}

async function upsertSupabase(email: string): Promise<"inserted" | "exists" | "skipped"> {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return "skipped";

  const res = await fetch(`${url}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal,resolution=ignore-duplicates",
    },
    body: JSON.stringify({ email, source: "landing" }),
  });

  if (res.status === 409) return "exists";
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase error ${res.status}: ${text}`);
  }
  return "inserted";
}

async function listSupabase(): Promise<WaitlistEntry[] | null> {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  const res = await fetch(
    `${url}/rest/v1/waitlist?select=email,created_at,source&order=created_at.desc`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    },
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase list error ${res.status}: ${text}`);
  }
  const rows = (await res.json()) as {
    email: string;
    created_at: string;
    source: string | null;
  }[];
  return rows.map((r) => ({
    email: r.email,
    createdAt: r.created_at,
    source: r.source ?? "landing",
  }));
}

/** Persist email to Supabase (if configured) and always to local JSON/CSV for backups. */
export async function addWaitlistEmail(email: string): Promise<{
  ok: true;
  already: boolean;
  store: "supabase+local" | "local";
}> {
  const normalized = email.trim().toLowerCase();
  let already = false;
  let usedSupabase = false;

  const remote = await upsertSupabase(normalized);
  if (remote !== "skipped") {
    usedSupabase = true;
    if (remote === "exists") already = true;
  }

  const list = await readLocal();
  if (list.some((e) => e.email === normalized)) {
    already = true;
  } else {
    list.push({
      email: normalized,
      createdAt: new Date().toISOString(),
      source: "landing",
    });
    await writeLocal(list);
  }

  return {
    ok: true,
    already,
    store: usedSupabase ? "supabase+local" : "local",
  };
}

export async function listWaitlistEmails(): Promise<WaitlistEntry[]> {
  const remote = await listSupabase();
  if (remote) return remote;
  return readLocal();
}

export function storageMode(): "supabase+local" | "local" {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return "supabase+local";
  }
  return "local";
}
