import { NextResponse } from "next/server";
import { getDocuments, uploadDocument, isMysqlConfigured } from "../../../lib/db";

// GET /api/documents - Retrieve all documents metadata
export async function GET() {
  try {
    const list = await getDocuments();
    return NextResponse.json(list, { 
      status: 200,
      headers: { "x-mock-db": isMysqlConfigured() ? "false" : "true" }
    });
  } catch (error) {
    console.error("GET /api/documents error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve documents list" },
      { status: 500 }
    );
  }
}

// POST /api/documents - Upload a new document
export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString() || "";
    const category = formData.get("category")?.toString() || "general";
    const file = formData.get("file");

    if (!title || !file || typeof file === "string") {
      return NextResponse.json(
        { error: "Title and file are required" },
        { status: 400 }
      );
    }

    const fileBytes = await file.arrayBuffer();
    const buffer = Buffer.from(fileBytes);
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop()?.toUpperCase() || "UNKNOWN";

    // Format file size
    const formatBytes = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };
    const fileSize = formatBytes(file.size);

    const docMetadata = await uploadDocument({
      title,
      description,
      category,
      file_name: fileName,
      file_type: fileExtension,
      file_size: fileSize,
      file_buffer: buffer,
    });

    return NextResponse.json(
      { message: "Document uploaded successfully", document: docMetadata },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/documents error:", error);
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 }
    );
  }
}
