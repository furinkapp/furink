import { SupabaseService } from "src/upstream/providers/supabase.service";

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { AuthDecoratorOptions } from "../decorators/auth.decorator";
import { AuthRequest, isAuthRequest } from "../interceptors/auth.interceptor";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly supabase: SupabaseService,
		private readonly reflector: Reflector,
	) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<AuthRequest>();

		// verify that AuthInterceptor has been used before AuthGuard
		if (!isAuthRequest(request)) {
			throw new Error("AuthGuard has been used without AuthInterceptor");
		}

		const auth = this.reflector.get<AuthDecoratorOptions>("auth", context.getHandler());

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (auth === undefined) {
			throw new Error("AuthGuard has been used without @Auth decorator");
		}

		// @Auth with no options disables auth
		if (auth.permissions === undefined && auth.roles === undefined) {
			return true;
		}

		return true;
	}
}
