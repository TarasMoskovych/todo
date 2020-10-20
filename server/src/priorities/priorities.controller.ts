import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { PrioritiesService } from './priorities.service';
import { Priority } from './priority.model';

@Controller('api/priorities')
export class PrioritiesController {

  constructor(private prioritiesService: PrioritiesService) { }

  @Get()
  get(): Priority[] {
    return this.prioritiesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Priority {
    return this.prioritiesService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() payload: Priority): Priority {
    return this.prioritiesService.create(payload);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() payload: Priority): Priority {
    return this.prioritiesService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Priority {
    return this.prioritiesService.delete(id);
  }

}
