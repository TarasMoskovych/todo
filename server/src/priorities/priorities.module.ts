import { Module } from '@nestjs/common';
import { PrioritiesController } from './priorities.controller';
import { PrioritiesService } from './priorities.service';

@Module({
  controllers: [PrioritiesController],
  providers: [PrioritiesService],
})
export class PrioritiesModule {}
