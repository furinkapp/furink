import { User as IUser } from "@furinkapp/prisma";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { AuthRequest, isAuthRequest } from "../interceptors/auth.interceptor";

/**
 * A decorator that returns the user object from the request.
 */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest<AuthRequest>();
	if (!isAuthRequest(request)) {
		throw new Error("User decorator has been used without Auth guard");
	}
	// we can assume that the user is not null because the AuthGuard would have thrown an error
	return request.auth.user as IUser;
});
