export class ValidEmail {
  private _type = Symbol("ValidEmail");

  protected constructor(public readonly value: string) {}

  static from(email: string) {
    if (this.validate(email)) {
      return new ValidEmail(email)
    }

    throw new TypeError('Email is not valid')
  }

  static validate(email: string): boolean {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    return regexp.test(email)
  }
}