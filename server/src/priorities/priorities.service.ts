import { Injectable } from '@nestjs/common';
import { AbstractLowDbService } from 'src/database';
import { Priority } from './priority.model';

@Injectable()
export class PrioritiesService extends AbstractLowDbService<Priority> {

  constructor() {
    super('priorities', 'Priority');
  }
}
