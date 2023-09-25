import { applyDecorators, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";

import { AuthGuard } from "../guards/auth.guard";
import { AuthInterceptor } from "../interceptors/auth.interceptor";

export interface AuthDecoratorOptions {
	roles?: string[];
	permissions?: string[];
	requireLoggedIn?: boolean;
}

/**
 * Apply the given auth options to the route.
 * @param options
 * @returns
 */
export const Auth = (options: AuthDecoratorOptions) =>
	applyDecorators(
		SetMetadata("auth", options),
		UseInterceptors(AuthInterceptor),
		UseGuards(AuthGuard),
	);
