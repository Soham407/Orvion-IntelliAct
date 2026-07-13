import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const MOCK_FILE_PATH = process.env.VERCEL 
  ? path.join('/tmp', 'db-mock.json')
  : path.join(process.cwd(), "lib/db-mock.json");

// Helper to determine if Supabase env vars are present
export const isDbConfigured = () => {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
};

// Create Supabase client
let supabase = null;
if (isDbConfigured()) {
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// Initial mock data to seed
const initialMockDocuments = [
  {
    id: 1,
    title: "Company Policy Manual",
    description: "Comprehensive guidelines covering company policies, code of conduct, and employee expectations.",
    category: "policy",
    file_name: "company_policy_manual.pdf",
    file_type: "PDF",
    file_size: "2.4 MB",
    file_data: Buffer.from("%PDF-1.4 ... [Mock Company Policy Manual content]").toString("base64"),
    uploaded_at: "2026-01-15T10:30:00.000Z"
  }
];

// Initialize DB schema / files
export async function initDatabase() {
  if (isDbConfigured()) {
    try {
      // Check if table exists and is empty
      const { data, error, count } = await supabase
        .from('documents')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error("Supabase Table Check Error (You may need to create the table in Supabase SQL editor):", error.message);
        return;
      }

      // Seed if empty
      if (count === 0) {
        console.log("Seeding Supabase database with initial documents...");
        let docsToSeed = initialMockDocuments;
        try {
          if (fs.existsSync(MOCK_FILE_PATH)) {
            const raw = fs.readFileSync(MOCK_FILE_PATH, "utf8");
            docsToSeed = JSON.parse(raw);
          }
        } catch (e) {
          console.error("Failed to read MOCK_FILE_PATH for seeding:", e);
        }

        let hasError = false;
        for (const doc of docsToSeed) {
          const { error: insertError } = await supabase
            .from('documents')
            .insert({
              title: doc.title,
              description: doc.description,
              category: doc.category,
              file_name: doc.file_name,
              file_type: doc.file_type,
              file_size: doc.file_size,
              file_data: doc.file_data,
              uploaded_at: new Date(doc.uploaded_at).toISOString()
            });
            
          if (insertError) {
            console.error("Failed to insert " + doc.title + ":", insertError);
            hasError = true;
          }
        }

        if (!hasError) {
          console.log("Supabase database initialized and seeded.");
        }
      }
    } catch (error) {
      console.error("Supabase DB Initialization Error:", error);
    }
  } else {
    // Local JSON mock
    if (!fs.existsSync(MOCK_FILE_PATH)) {
      fs.mkdirSync(path.dirname(MOCK_FILE_PATH), { recursive: true });
      fs.writeFileSync(MOCK_FILE_PATH, JSON.stringify(initialMockDocuments, null, 2), "utf8");
      console.log("Mock database file initialized.");
    }
  }
}

// Get all documents metadata
export async function getDocuments() {
  await initDatabase();

  if (isDbConfigured()) {
    const { data, error } = await supabase
      .from('documents')
      .select('id, title, description, category, file_name, file_type, file_size, uploaded_at')
      .order('id', { ascending: false });

    if (error) throw error;
    return data;
  } else {
    if (fs.existsSync(MOCK_FILE_PATH)) {
      const raw = fs.readFileSync(MOCK_FILE_PATH, "utf8");
      return JSON.parse(raw).map(({ file_data, ...rest }) => rest).sort((a, b) => b.id - a.id);
    }
    return [];
  }
}

// Get single document by ID
export async function getDocumentById(id) {
  await initDatabase();

  if (isDbConfigured()) {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return {
      ...data,
      file_data: Buffer.from(data.file_data, 'base64')
    };
  } else {
    if (fs.existsSync(MOCK_FILE_PATH)) {
      const raw = fs.readFileSync(MOCK_FILE_PATH, "utf8");
      const list = JSON.parse(raw);
      const item = list.find((d) => d.id === parseInt(id));
      if (!item) return null;
      return {
        ...item,
        file_data: Buffer.from(item.file_data, "base64")
      };
    }
    return null;
  }
}

// Upload a new document
export async function uploadDocument({ title, description, category, file_name, file_type, file_size, file_buffer }) {
  await initDatabase();

  if (isDbConfigured()) {
    const base64Data = file_buffer.toString("base64");
    const { data, error } = await supabase
      .from('documents')
      .insert([{
        title,
        description,
        category,
        file_name,
        file_type,
        file_size,
        file_data: base64Data
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    const raw = fs.existsSync(MOCK_FILE_PATH) ? fs.readFileSync(MOCK_FILE_PATH, "utf8") : "[]";
    const list = JSON.parse(raw);
    const newId = list.length > 0 ? Math.max(...list.map(d => d.id)) + 1 : 1;
    const newDoc = {
      id: newId, title, description, category, file_name, file_type, file_size,
      file_data: file_buffer.toString("base64"),
      uploaded_at: new Date().toISOString()
    };
    list.push(newDoc);
    fs.writeFileSync(MOCK_FILE_PATH, JSON.stringify(list, null, 2), "utf8");
    const { file_data, ...metadata } = newDoc;
    return metadata;
  }
}

// Delete a document
export async function deleteDocument(id) {
  await initDatabase();

  if (isDbConfigured()) {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);
    return !error;
  } else {
    if (fs.existsSync(MOCK_FILE_PATH)) {
      const raw = fs.readFileSync(MOCK_FILE_PATH, "utf8");
      let list = JSON.parse(raw);
      const originalLength = list.length;
      list = list.filter((d) => d.id !== parseInt(id));
      fs.writeFileSync(MOCK_FILE_PATH, JSON.stringify(list, null, 2), "utf8");
      return list.length < originalLength;
    }
    return false;
  }
}
