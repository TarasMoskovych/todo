import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { CategoriesModule } from './categories/categories.module';
import { PrioritiesModule } from './priorities/priorities.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client/dist/todo'),
    }),
    CategoriesModule,
    PrioritiesModule,
    TasksModule,
  ],
})
export class AppModule {}
