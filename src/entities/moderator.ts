import { Role } from "./role";
import { AccountInfo } from "./account-info";
import * as t from 'runtypes'

export const Moderator = t.Record({
  ...AccountInfo.fields,
  role: t.Literal(Role.MODERATOR)
})
  .asReadonly()
  .withBrand('Moderator')

export type Moderator = t.Static<typeof Moderator>