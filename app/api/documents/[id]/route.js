import { NextResponse } from "next/server";
import { deleteDocument } from "../../../../lib/db";


// DELETE /api/documents/[id] - Remove a document
export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Missing document ID" }, { status: 400 });
    }

    const success = await deleteDocument(id);
    if (!success) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Document deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/documents/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    );
  }
}
