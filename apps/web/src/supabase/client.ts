import { expect } from "@/util/expect";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	expect(process.env.NEXT_PUBLIC_SUPABASE_URL),
	expect(process.env.NEXT_PUBLIC_SUPABASE_KEY),
);
