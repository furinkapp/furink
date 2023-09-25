import { Request } from "express";
import { Observable } from "rxjs";
import { PrismaService } from "src/common/providers/prisma.service";
import { SupabaseService } from "src/upstream/providers/supabase.service";

import { User } from "@furinkapp/prisma";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User as SupabaseUser } from "@supabase/supabase-js";

import { AuthDecoratorOptions } from "../decorators/auth.decorator";

/**
 * A request object that has been intercepted by AuthInterceptor.
 */
export interface AuthRequest extends Request {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	readonly __authInterceptor: boolean;
	auth: {
		supabase: SupabaseUser | null;
		user: User | null;
		token: string;
	};
}

/**
 * Type guard validating that the request has been intercepted by AuthInterceptor.
 * @param request
 * @returns
 */
export const isAuthRequest = (request: Request): request is AuthRequest =>
	// @ts-expect-error Default request object does not have this property
	request.__authInterceptor === true;

export const InterceptorSymbol = Symbol("AuthInterceptor");

/**
 * An interceptor that attaches auth information to the request.
 */
export class AuthInterceptor implements NestInterceptor {
	constructor(
		private readonly supabase: SupabaseService,
		private readonly reflector: Reflector,
		private readonly prisma: PrismaService,
	) {}

	async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
		const request = context.switchToHttp().getRequest<AuthRequest>();

		// @ts-expect-error Setting a readonly on the request object
		request.__authInterceptor = true;

		// ignore if auth is disabled
		const auth = this.reflector.get<AuthDecoratorOptions | undefined>("auth", context.getHandler());
		if (auth === undefined) {
			return next.handle();
		}

		if (request.headers.authorization === undefined) {
			return next.handle();
		}

		// extract token from headers
		const token: string | undefined = request.headers.authorization.split(" ")[0];

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (token === undefined) {
			request.auth = {
				token,
				supabase: null,
				user: null,
			};

			return next.handle();
		}

		// fetch user from supabase
		const {
			data: { user: supabaseUser },
			error,
		} = await this.supabase.auth.getUser(token);

		if (error !== null || supabaseUser === null) {
			request.auth = {
				token,
				supabase: null,
				user: null,
			};
			return next.handle();
		}

		// fetch user from database
		const user = await this.prisma.user.findFirst({
			where: {
				id: supabaseUser.id,
			},
		});

		request.auth = {
			supabase: supabaseUser,
			token,
			user,
		};

		return next.handle();
	}
}
