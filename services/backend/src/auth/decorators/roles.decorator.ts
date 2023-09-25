import { Auth } from "./auth.decorator";

export const Roles = (...roles: string[]) => Auth({ roles });
