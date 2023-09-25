import { ConfigService } from "src/common/providers/config.service";
import { Stripe } from "stripe";

import { Injectable } from "@nestjs/common";

@Injectable()
export class StripeService extends Stripe {
	constructor(private readonly config: ConfigService) {
		super(config.get("upstream.stripe.apiKey"), {
			apiVersion: "2022-11-15",
		});
	}
}
