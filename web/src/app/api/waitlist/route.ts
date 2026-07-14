import { NextRequest, NextResponse } from "next/server";
import { addWaitlistEmail, isValidEmail } from "@/lib/waitlist";

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  try {
    const result = await addWaitlistEmail(email);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[waitlist]", err);
    return NextResponse.json(
      { error: "Couldn’t save email. Try again." },
      { status: 500 },
    );
  }
}
