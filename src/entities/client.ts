import { Role } from "./role";
import { AccountInfo } from "./account-info";
import * as t from 'runtypes'

export const Client = t.Record({
  ...AccountInfo.fields,
  role: t.Literal(Role.CLIENT)
})
  .asReadonly()
  .withBrand('Client')

export type Client = t.Static<typeof Client>