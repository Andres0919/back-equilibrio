import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UidGeneratorInterface } from '../../domain';

@Injectable()
export class UuidGeneratorService implements UidGeneratorInterface {
  generate(): string {
    return uuidv4();
  }
}
