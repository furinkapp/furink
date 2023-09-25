import { Module } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";

import { SentryService } from "./providers/sentry.service";
import { StripeService } from "./providers/stripe.service";
import { TypesenseService } from "./providers/typesense.service";

@Module({
	providers: [SentryService, StripeService, SupabaseClient, TypesenseService],
	exports: [SentryService, StripeService, SupabaseClient, TypesenseService],
})
export class UpstreamModule {}
