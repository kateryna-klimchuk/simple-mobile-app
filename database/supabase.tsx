import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://juwsdvrhulixkssossrw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1d3NkdnJodWxpeGtzc29zc3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NTU2NTQsImV4cCI6MjAwNDEzMTY1NH0.OkxtBc7c30Tut4slhj_1fYJQKHUrG9QHVn5VurHs5ds";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
