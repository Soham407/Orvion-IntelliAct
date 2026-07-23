import { NextResponse } from "next/server";
import { getDocumentById } from "../../../../../lib/db";
import { getSession } from "../../../../../lib/auth";


// Helper to determine mime type
function getMimeType(fileType, fileName) {
  const ext = fileType?.toLowerCase() || fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return "application/pdf";
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "doc":
      return "application/msword";
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    case "xls":
      return "application/vnd.ms-excel";
    case "xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    case "txt":
      return "text/plain";
    default:
      return "application/octet-stream";
  }
}

// GET /api/documents/[id]/download - Serve file content for download
export async function GET(request, context) {
  if (!getSession(request)) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {
    const params = await context.params;
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Missing document ID" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const isInline = searchParams.get("inline") === "true";

    const doc = await getDocumentById(id);
    if (!doc || !doc.file_data) {
      return NextResponse.json({ error: "Document or file data not found" }, { status: 404 });
    }

    const fileBuffer = doc.file_data; // This is a Buffer in Node
    const mimeType = getMimeType(doc.file_type, doc.file_name);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": isInline
          ? `inline; filename="${encodeURIComponent(doc.file_name)}"`
          : `attachment; filename="${encodeURIComponent(doc.file_name)}"`,
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("GET /api/documents/[id]/download error:", error);
    return NextResponse.json(
      { error: "Failed to download/view document" },
      { status: 500 }
    );
  }
}
