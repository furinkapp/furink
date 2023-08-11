import { Module } from "@nestjs/common";

import { SentryService } from "./providers/sentry.service";
import { StripeService } from "./providers/stripe.service";

@Module({
	providers: [SentryService, StripeService],
	exports: [SentryService, StripeService],
})
export class UpstreamModule {}
