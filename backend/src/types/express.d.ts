import "express-serve-static-core";
import type { AuthUser } from "../modules/auth/auth.types.ts";

declare module "express-serve-static-core" {
  interface Request {
    user: AuthUser;
  }
}
