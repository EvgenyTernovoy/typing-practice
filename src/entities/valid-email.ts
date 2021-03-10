export class ValidEmail {
  readonly value: string;
  private _type = Symbol("ValidEmail");

  constructor(email: string) {
    this.value = this.validate(email)
  }

  validate(email:string): string {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (!regexp.test(email)) {
      throw new TypeError('Email is not valid')
    }

    return email
  }
}