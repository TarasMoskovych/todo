import { PriorityEntity } from '../core/+store';
import { Category, CategoryEntity } from './category.model';
import { Filter } from './filter.model';
import { Priority } from './priority.model';
import { Task, TaskEntity, TaskFilter } from './task.model';

export class TestData {
  private static readonly filter: Filter = { q: 'eDu' };

  private static readonly tasksFilter: TaskFilter = { q: 'search value', completed: null, priority: null };

  private static readonly categories: Category[] = [
    {
      id: '1',
      name: 'work',
    },
    {
      id: '2',
      name: 'family',
    },
    {
      id: '3',
      name: 'education',
    },
    {
      id: '4',
      name: 'vacation'
    },
    {
      id: '5',
      name: 'sport',
    },
  ];

  private static readonly categoriesEntities: CategoryEntity = TestData.categories.reduce((acc: CategoryEntity, category: Category) => {
    return { ...acc, [category.id]: category };
  }, {});

  private static readonly tasks: Task[] = [
    {
      id: '1',
      name: 'Fill the gasoline tank full',
      priority: '3',
      completed: false,
      category: '10',
      date: new Date('2020-04-10'),
    },
    {
      id: '2',
      name: 'Submit reports to the head of department',
      priority: '1',
      completed: false,
      category: '1',
      date: new Date('2020-04-11'),
    },
    {
      id: '3',
      name: 'Clean up the room, water the plants',
      priority: '3',
      completed: true,
      category: '2'
    },
    {
      id: '4',
      name: 'Go to the park with the family, invite friends',
      priority: '2',
      completed: false,
      category: '2',
      date: new Date('2020-08-17'),
    },
    {
      id: '5',
      name: 'Find and learn a quantum physics textbook',
      completed: false,
      category: '3'
    },
  ];

  private static readonly tasksEntities: TaskEntity = TestData.tasks.reduce((acc: TaskEntity, task: Task) => {
    return { ...acc, [task.id]: task };
  }, {});

  private static readonly priorities: Priority[] = [
    {
      id: '1',
      name: 'low',
      color: '#e5e5e5'
    },
    {
      id: '2',
      name: 'medium',
      color: '#85D1B2'
    },
    {
      id: '3',
      name: 'high',
      color: '#F1828D'
    },
    {
      id: '4',
      name: 'highest',
      color: '#F1128D'
    },
  ];

  private static readonly prioritiesEntities: PriorityEntity = TestData.priorities.reduce((acc: PriorityEntity, priority: Priority) => {
    return { ...acc, [priority.id]: priority };
  }, {});

  static get data() {
    return {
      filter:             { ...this.filter },
      tasksFilter:        { ...this.tasksFilter },
      categories:         [ ...this.categories ],
      categoriesEntities: { ...this.categoriesEntities },
      tasks:              [ ...this.tasks ],
      tasksEntities:      { ...this.tasksEntities },
      priorities:         [ ...this.priorities ],
      prioritiesEntities: { ...this.prioritiesEntities },
    };
  }
}
