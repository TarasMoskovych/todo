import { Category } from 'src/categories/category.model';
import { Priority } from 'src/priorities/priority.model';
import { Task } from 'src/tasks/task.model';

export class TestData {
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

  static get data() {
    return {
      categories: [ ...this.categories ],
      tasks:      [ ...this.tasks ],
      priorities: [ ...this.priorities ],
    };
  }
}
