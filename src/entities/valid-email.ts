import * as t from "runtypes";

export const ValidEmail = t.String
  .withConstraint(string => {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(string)
  })
  .withBrand('Email')

export type ValidEmail = t.Static<typeof ValidEmail>