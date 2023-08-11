import { ConfigService } from "src/common/providers/config.service";

import { Injectable, OnModuleInit } from "@nestjs/common";
import * as Sentry from "@sentry/node";

@Injectable()
export class SentryService implements OnModuleInit {
	constructor(private readonly config: ConfigService) {}

	onModuleInit() {
		Sentry.init({
			dsn: this.config.get("upstream.sentry.dsn"),
			tracesSampleRate: 1.0,
		});
	}

	/**
	 * Initializes a new transaction.
	 * @param param0
	 */
	startTransaction({ name, op }: { name: string; op?: string }) {
		return Sentry.startTransaction({ name, op });
	}

	/**
	 * Captures a message and sends it to Sentry.
	 * @param message
	 * @param severity
	 * @returns
	 */
	captureMessage(message: string, severity: Sentry.SeverityLevel = "info") {
		return Sentry.captureMessage(message, severity);
	}

	captureException(exception: unknown, context: Record<string, number | string> = {}) {
		return Sentry.captureException(exception, context);
	}
}
