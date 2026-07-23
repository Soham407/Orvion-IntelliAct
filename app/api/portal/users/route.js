import { NextResponse } from "next/server";
import { listPortalUsers, createPortalUser, getPortalUserByUsername } from "../../../../lib/db";
import { getSession, hashPassword } from "../../../../lib/auth";

function requireAdmin(request) {
  const session = getSession(request);
  if (!session) return { error: NextResponse.json({ error: "Not authenticated" }, { status: 401 }) };
  if (session.role !== "admin") return { error: NextResponse.json({ error: "Admin access required" }, { status: 403 }) };
  return { session };
}

// GET /api/portal/users - List employee/admin accounts (admin only)
export async function GET(request) {
  const { error } = requireAdmin(request);
  if (error) return error;

  const users = await listPortalUsers();
  return NextResponse.json(users);
}

// POST /api/portal/users - Create a new account (admin only)
export async function POST(request) {
  const { error } = requireAdmin(request);
  if (error) return error;

  const { username, password, role } = await request.json();
  if (!username?.trim() || !password || !["admin", "employee"].includes(role)) {
    return NextResponse.json({ error: "Username, password, and a valid role are required" }, { status: 400 });
  }

  const existing = await getPortalUserByUsername(username.trim());
  if (existing) {
    return NextResponse.json({ error: `Account "${username}" already exists` }, { status: 409 });
  }

  const user = await createPortalUser({
    username: username.trim(),
    password_hash: hashPassword(password),
    role,
  });
  return NextResponse.json(user, { status: 201 });
}
