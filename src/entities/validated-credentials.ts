import { Opaque } from "../utils/opaque";

declare const validatedEmail: unique symbol
export type ValidatedEmail = Opaque<typeof validatedEmail, string>

declare const validatedPassword: unique symbol
export type ValidatedPassword = Opaque<typeof validatedPassword, string>