import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UidGenerator } from '../../domain/services/uid-generator.interface';

@Injectable()
export class UuidGenerator implements UidGenerator {
  generate(): string {
    return uuidv4();
  }
}
