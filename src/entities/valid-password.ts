import * as t from "runtypes";


export const ValidPassword = t.String
  .withConstraint(string => !!string)
  .withBrand('Password')


export type ValidPassword = t.Static<typeof ValidPassword>