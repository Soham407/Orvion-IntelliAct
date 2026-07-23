import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    // 1. Verify that this request is actually coming from Vercel Cron
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;
    
    // If we have a CRON_SECRET configured, enforce it
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Connect to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. Ping the database with the absolute lightest query possible
    // We just select 1 id and limit to 1 row to generate activity without using resources
    const { data, error } = await supabase
      .from("documents")
      .select("id")
      .limit(1);

    if (error) throw error;

    return NextResponse.json({ 
      status: "ok", 
      message: "Supabase pinged successfully to prevent auto-pause",
      timestamp: new Date().toISOString() 
    }, { status: 200 });

  } catch (error) {
    console.error("Keepalive error:", error);
    return NextResponse.json({ error: "Failed to ping database" }, { status: 500 });
  }
}
