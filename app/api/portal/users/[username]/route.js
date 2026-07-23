import { NextResponse } from "next/server";
import { updatePortalUser, deletePortalUser } from "../../../../../lib/db";
import { getSession, hashPassword } from "../../../../../lib/auth";

function requireAdmin(request) {
  const session = getSession(request);
  if (!session) return { error: NextResponse.json({ error: "Not authenticated" }, { status: 401 }) };
  if (session.role !== "admin") return { error: NextResponse.json({ error: "Admin access required" }, { status: 403 }) };
  return { session };
}

// PATCH /api/portal/users/[username] - Update password and/or role (admin only)
export async function PATCH(request, context) {
  const { error, session } = requireAdmin(request);
  if (error) return error;

  const { username } = await context.params;
  const { password, role } = await request.json();
  if (role && !["admin", "employee"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }
  if (role && role !== "admin" && username.toLowerCase() === session.username.toLowerCase()) {
    return NextResponse.json({ error: "You cannot remove your own admin access" }, { status: 400 });
  }

  const updates = {};
  if (password) updates.password_hash = hashPassword(password);
  if (role) updates.role = role;

  const user = await updatePortalUser(username, updates);
  return NextResponse.json(user);
}

// DELETE /api/portal/users/[username] - Remove an account (admin only)
export async function DELETE(request, context) {
  const { error, session } = requireAdmin(request);
  if (error) return error;

  const { username } = await context.params;
  if (username.toLowerCase() === session.username.toLowerCase()) {
    return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 });
  }

  const success = await deletePortalUser(username);
  if (!success) {
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
  return NextResponse.json({ message: "Account deleted" });
}
