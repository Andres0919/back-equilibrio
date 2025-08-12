export abstract class DomainEntity {
  protected constructor(
    public readonly id: string,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}

  abstract equals(other: DomainEntity): boolean;
}
