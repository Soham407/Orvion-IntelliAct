import { createClient } from "@supabase/supabase-js";

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

// Initialize DB schema / files
export async function initDatabase() {
  if (isDbConfigured()) {
    try {
      // Check if table exists
      const { error } = await supabase
        .from('documents')
        .select('id', { count: 'exact', head: true });

      if (error) {
        console.error("Supabase Table Check Error (You may need to create the table in Supabase SQL editor):", error.message);
      }
    } catch (error) {
      console.error("Supabase DB Initialization Error:", error);
    }
  } else {
    console.warn("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
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
    return data || [];
  }
  return [];
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
  }
  return null;
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
  }
  throw new Error("Supabase is not configured.");
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
  }
  return false;
}
