import { Auth } from "./auth.decorator";

export const Permissions = (...permissions: string[]) => Auth({ permissions });
