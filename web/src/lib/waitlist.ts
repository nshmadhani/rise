export type WaitlistEntry = {
  email: string;
  createdAt: string;
  source?: string;
};

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function gistConfig() {
  const id = process.env.WAITLIST_GIST_ID;
  const token = process.env.WAITLIST_GITHUB_TOKEN;
  if (!id || !token) {
    throw new Error(
      "Missing WAITLIST_GIST_ID or WAITLIST_GITHUB_TOKEN (private gist store).",
    );
  }
  return { id, token };
}

async function readGist(): Promise<{ entries: WaitlistEntry[]; sha?: string }> {
  const { id, token } = gistConfig();
  const res = await fetch(`https://api.github.com/gists/${id}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Gist read failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as {
    files?: Record<string, { content?: string }>;
    history?: { version: string }[];
  };
  const raw = data.files?.["waitlist.json"]?.content ?? "[]";
  const entries = JSON.parse(raw) as WaitlistEntry[];
  return { entries: Array.isArray(entries) ? entries : [] };
}

async function writeGist(entries: WaitlistEntry[]) {
  const { id, token } = gistConfig();
  const body = JSON.stringify({
    files: {
      "waitlist.json": {
        content: `${JSON.stringify(entries, null, 2)}\n`,
      },
    },
  });
  const res = await fetch(`https://api.github.com/gists/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body,
  });
  if (!res.ok) {
    throw new Error(`Gist write failed: ${res.status} ${await res.text()}`);
  }
}

export async function addWaitlistEmail(email: string): Promise<{
  ok: true;
  already: boolean;
  store: "gist";
}> {
  const normalized = email.trim().toLowerCase();
  const { entries } = await readGist();
  if (entries.some((e) => e.email === normalized)) {
    return { ok: true, already: true, store: "gist" };
  }
  entries.push({
    email: normalized,
    createdAt: new Date().toISOString(),
    source: "landing",
  });
  await writeGist(entries);
  return { ok: true, already: false, store: "gist" };
}

export async function listWaitlistEmails(): Promise<WaitlistEntry[]> {
  const { entries } = await readGist();
  return entries.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function storageMode(): "gist" {
  return "gist";
}
