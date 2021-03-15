import * as t from 'runtypes'



export const ValidCredentials = t.Record({
  email: t.String.withConstraint(string => {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(string)
  }).withBrand('Email'),
  password: t.String.withConstraint(string => !!string).withBrand('Password')
}).asReadonly()

export type ValidCredentials = t.Static<typeof ValidCredentials>