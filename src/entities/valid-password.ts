export class ValidPassword {
  private _type = Symbol("ValidPassword");

  protected constructor(public readonly value: string) {
  }

  static from(password: string) {
    if(this.validate(password)) {
      return new ValidPassword(password)
    }

    throw new TypeError('Password is not valid')
  }

  static validate(password:string): boolean {
    return !!password
  }
}