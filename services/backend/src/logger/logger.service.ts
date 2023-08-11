import { SentryService } from "src/upstream/providers/sentry.service";

import { ConsoleLogger, Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
	constructor(private readonly sentry: SentryService) {
		super();
	}

	override error(message: unknown, stack?: unknown, context?: unknown, ...rest: unknown[]): void {
		super.error(message, stack, context, ...rest);
		this.sentry.captureMessage(String(message), "error");
	}

	override warn(message: unknown, context?: unknown, ...rest: unknown[]): void {
		super.warn(message, context, ...rest);
		this.sentry.captureMessage(String(message), "warning");
	}

	override log(message: unknown, context?: unknown, ...rest: unknown[]): void {
		super.log(message, context, ...rest);
		this.sentry.captureMessage(String(message), "log");
	}

	override verbose(message: unknown, context?: unknown, ...rest: unknown[]): void {
		super.verbose(message, context, ...rest);
		this.sentry.captureMessage(String(message), "info");
	}

	override debug(message: unknown, context?: unknown, ...rest: unknown[]): void {
		super.debug(message, context, ...rest);
		this.sentry.captureMessage(String(message), "debug");
	}
}
