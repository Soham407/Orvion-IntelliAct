import { createClient } from "@supabase/supabase-js";

// Helper to determine if Supabase env vars are present
export const isDbConfigured = () => {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
};

// Server-only client using the service_role key — RLS on `documents` blocks
// anon/authenticated entirely, so the API routes are the only access path.
let supabase = null;
if (isDbConfigured()) {
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}


// Get all documents metadata
export async function getDocuments() {

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

  if (isDbConfigured()) {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);
    return !error;
  }
  return false;
}

// Portal users (employee portal auth)

export async function getPortalUserByUsername(username) {
  if (!isDbConfigured()) return null;
  const { data, error } = await supabase
    .from('portal_users')
    .select('id, username, password_hash, role')
    .ilike('username', username)
    .single();
  if (error) return null;
  return data;
}

export async function listPortalUsers() {
  if (!isDbConfigured()) return [];
  const { data, error } = await supabase
    .from('portal_users')
    .select('username, role, created_at')
    .order('username', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function createPortalUser({ username, password_hash, role }) {
  const { data, error } = await supabase
    .from('portal_users')
    .insert([{ username, password_hash, role }])
    .select('username, role, created_at')
    .single();
  if (error) throw error;
  return data;
}

export async function updatePortalUser(username, { password_hash, role }) {
  const updates = {};
  if (password_hash) updates.password_hash = password_hash;
  if (role) updates.role = role;

  const { data, error } = await supabase
    .from('portal_users')
    .update(updates)
    .ilike('username', username)
    .select('username, role, created_at')
    .single();
  if (error) throw error;
  return data;
}

export async function deletePortalUser(username) {
  const { error } = await supabase
    .from('portal_users')
    .delete()
    .ilike('username', username);
  return !error;
}
