import { DomainEntity, ValidationError } from '../../../../shared/domain';

export interface CategoryProps {
  id?: number; // Optional for creation, required for existing entities
  uid: string; // Required - must be provided from outside the domain
  name: string;
  description?: string;
  color?: string; // Hex color for UI representation
  icon?: string; // Icon identifier for UI
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category extends DomainEntity {
  private constructor(
    id: number | undefined,
    uid: string,
    private readonly _name: string,
    private readonly _description: string | undefined,
    private readonly _color: string | undefined,
    private readonly _icon: string | undefined,
    private readonly _isActive: boolean,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id || 0, uid, createdAt, updatedAt); // id will be set by database if undefined
  }

  // Factory method
  static create(props: CategoryProps): Category {
    this.validateName(props.name);
    this.validateUid(props.uid);
    this.validateColor(props.color);

    return new Category(
      props.id,
      props.uid,
      props.name.trim(),
      props.description?.trim(),
      props.color,
      props.icon,
      props.isActive,
      props.createdAt,
      props.updatedAt,
    );
  }

  // Getters
  get name(): string {
    return this._name;
  }

  get description(): string | undefined {
    return this._description;
  }

  get color(): string | undefined {
    return this._color;
  }

  get icon(): string | undefined {
    return this._icon;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  // Business rules
  private static validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new ValidationError('Category name is required');
    }

    if (name.trim().length < 2) {
      throw new ValidationError(
        'Category name must be at least 2 characters long',
      );
    }

    if (name.trim().length > 50) {
      throw new ValidationError('Category name must not exceed 50 characters');
    }
  }

  private static validateUid(uid: string): void {
    if (!uid || uid.trim().length === 0) {
      throw new ValidationError('UID is required');
    }
  }

  private static validateColor(color?: string): void {
    if (color && !/^#[0-9A-F]{6}$/i.test(color)) {
      throw new ValidationError(
        'Color must be a valid hex color format (#RRGGBB)',
      );
    }
  }

  // Domain methods
  isInactive(): boolean {
    return !this._isActive;
  }

  hasDescription(): boolean {
    return !!this._description && this._description.length > 0;
  }

  hasCustomAppearance(): boolean {
    return !!this._color || !!this._icon;
  }

  equals(other: Category): boolean {
    return (
      other instanceof Category &&
      this.uid === other.uid &&
      this._name === other._name &&
      this._description === other._description &&
      this._color === other._color &&
      this._icon === other._icon &&
      this._isActive === other._isActive
    );
  }

  // For serialization/persistence
  toPrimitives(): CategoryProps {
    return {
      id: this.id,
      uid: this.uid,
      name: this._name,
      description: this._description,
      color: this._color,
      icon: this._icon,
      isActive: this._isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
