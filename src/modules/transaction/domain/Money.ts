export class Money {
  private constructor(private readonly value: number) {}

  static create(value: number): Money {
    if (isNaN(value) || value < 0) {
      throw new Error("Invalid money value");
    }
    return new Money(value);
  }

  getValue(): number {
    return this.value;
  }
}
