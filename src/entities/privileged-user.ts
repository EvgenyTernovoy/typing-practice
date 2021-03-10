import type { Admin } from "./admin";
import type { Moderator } from "./moderator";

export type PrivilegedUser = Admin | Moderator;
