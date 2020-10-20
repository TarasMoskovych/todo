import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Task, TaskFilter } from './task.model';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
export class TasksController {

  constructor(private tasksService: TasksService) { }

  @Get()
  get(@Query() filter: TaskFilter): Task[] {
    return this.tasksService.get(filter);
  }

  @Get(':id')
  getById(@Param('id') id: string): Task {
    return this.tasksService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() payload: Task): Task {
    return this.tasksService.create(payload);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() payload: Task): Task {
    return this.tasksService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Task {
    return this.tasksService.delete(id);
  }

}
