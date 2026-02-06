import { createClient } from "@supabase/supabase-js";
import { getServerEnv } from "@/config/env";
import { clientEnv } from "@/config/env";

export function getSupabaseAdmin() {
  const { supabaseServiceRoleKey } = getServerEnv();
  return createClient(clientEnv.supabaseUrl, supabaseServiceRoleKey);
}
