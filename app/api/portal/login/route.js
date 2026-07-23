import { NextResponse } from "next/server";
import { getPortalUserByUsername } from "../../../../lib/db";
import { verifyPassword, createSessionToken, sessionCookie } from "../../../../lib/auth";

export async function POST(request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }

  const user = await getPortalUserByUsername(username.trim());
  if (!user || !verifyPassword(password, user.password_hash)) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const token = createSessionToken({ username: user.username, role: user.role });
  const res = NextResponse.json({ username: user.username, role: user.role });
  res.cookies.set(sessionCookie(token));
  return res;
}
