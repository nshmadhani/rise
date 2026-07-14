import { NextRequest, NextResponse } from "next/server";
import { listWaitlistEmails, storageMode } from "@/lib/waitlist";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const secret = process.env.WAITLIST_ADMIN_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Set WAITLIST_ADMIN_SECRET to enable export." },
      { status: 503 },
    );
  }

  const provided =
    req.nextUrl.searchParams.get("secret") ??
    req.headers.get("x-admin-secret") ??
    "";

  if (provided !== secret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const format = req.nextUrl.searchParams.get("format") ?? "json";
  const entries = await listWaitlistEmails();

  if (format === "csv") {
    const csv =
      "email,createdAt,source\n" +
      entries
        .map(
          (e) =>
            `${JSON.stringify(e.email)},${e.createdAt},${JSON.stringify(e.source ?? "landing")}`,
        )
        .join("\n") +
      "\n";
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="rise-waitlist.csv"',
      },
    });
  }

  return NextResponse.json({
    store: storageMode(),
    count: entries.length,
    entries,
  });
}
