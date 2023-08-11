import { Module } from "@nestjs/common";

import { SentryService } from "./providers/sentry.service";
import { StripeService } from "./providers/stripe.service";
import { TypesenseService } from "./providers/typesense.service";

@Module({
	providers: [SentryService, StripeService, TypesenseService],
	exports: [SentryService, StripeService, TypesenseService],
})
export class UpstreamModule {}
