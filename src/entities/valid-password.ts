export class ValidPassword {
  readonly value: string;
  private _type = Symbol("ValidPassword");

  constructor(pass: string) {
    this.value = this.validate(pass)
  }

  validate(pass:string): string {
    if (!pass) {
      throw new TypeError('Password is not valid')
    }

    return pass
  }
}