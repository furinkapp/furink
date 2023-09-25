import { ConfigService } from "src/common/providers/config.service";

import { Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService extends SupabaseClient {
	constructor(config: ConfigService) {
		super(config.get("upstream.supabase.url"), config.get("upstream.supabase.key"), {
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		});
	}
}
