-- Fix: rls_disabled_in_public advisory. Table had no RLS, so anyone with the
-- anon key could read/write/delete every row via the Data API.
-- App has no end-user auth; all access goes through server-side API routes,
-- so lock the table down entirely and let the server use the service_role key
-- (which bypasses RLS) instead of the anon key.
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON documents FROM anon, authenticated;
