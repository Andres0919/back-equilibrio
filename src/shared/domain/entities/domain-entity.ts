export abstract class DomainEntity {
  protected constructor(
    public readonly id: number,
    public readonly uid: string,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}

  abstract equals(other: DomainEntity): boolean;
}
