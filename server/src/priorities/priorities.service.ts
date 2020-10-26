import { BadRequestException, Injectable } from '@nestjs/common';
import { AbstractLowDbService } from 'src/database';
import { Priority } from './priority.model';

@Injectable()
export class PrioritiesService extends AbstractLowDbService<Priority> {

  constructor() {
    super('priorities', 'Priority');
  }

  create(priority: Priority): Priority {
    const name = priority.name.toLowerCase();

    if (this.findByProp('name', name)) {
      throw new BadRequestException(`Priority name should be unique`);
    }

    return super.create({ ...priority, name });
  }
}
