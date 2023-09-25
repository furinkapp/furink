import { catchError, finalize, Observable, throwError } from "rxjs";

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";

import { SentryService } from "../providers/sentry.service";

@Injectable()
export class SentryInterceptor implements NestInterceptor {
	constructor(private readonly sentry: SentryService) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const transaction = this.sentry.startTransaction({
			name: `Handler ${context.getHandler().name} on Controller ${context.getClass().name}`,
			op: `${context.getClass().name}-${context.getHandler().name}`,
		});
		return next.handle().pipe(
			catchError((err: unknown) => {
				this.sentry.captureException(err, {
					handler: context.getHandler().name,
					controller: context.getClass().name,
				});
				return throwError(() => err);
			}),
			finalize(() => {
				transaction.finish();
			}),
		);
	}
}
