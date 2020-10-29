import { StatisticData } from 'src/app/models';

export class Constants {

  public static readonly STORAGE_KEY = 'todo';

  public static readonly VALIDATION_PATTERN = new RegExp(['^([a-z0-9,().\'"?!-]+\\s)*', '[a-z0-9,().\'"?!-]+$'].join(''),'i');

  public static readonly PAGE_SIZE_OPTIONS = [5, 10, 50, 100];

  public static readonly STATISTICS_DATA: StatisticData[] = [
    {
      key: 'completed',
      icon: 'done',
      title: 'Completed tasks',
      statusClass: 'success',
      wrapperClass: 'completed-card',
    },
    {
      key: 'uncompleted',
      icon: 'clear',
      title: 'Uncompleted tasks',
      statusClass: 'warning',
    },
    {
      key: 'completedValue',
      icon: 'star',
      title: 'Percentage of completed tasks',
      percent: true,
      statusClass: 'success',
      wrapperClass: 'completed-card',
    },
    {
      key: 'uncompletedValue',
      icon: 'star_outline',
      title: 'Percentage of uncompleted tasks',
      percent: true,
      statusClass: 'warning',

    },
  ];

  public static readonly FOOTER_LINKS = [
    {
      href: 'https://www.creative-tim.com',
      text: 'Creative Tim',
    },
    {
      href: 'https://creative-tim.com/presentation',
      text: 'About Us',
    },
    {
      href: 'http://blog.creative-tim.com',
      text: 'Blog',
    },
    {
      href: 'https://www.creative-tim.com/license',
      text: 'Licenses',
    },
  ];

  public static readonly TUTORIAL_STEPS = [
    {
      element: '#step1',
      intro: 'Here you can search some category, create new one, select, edit and remove current. Each category displays count of uncompleted tasks',
      scrollTo: 'tooltip',
      position: 'right',
    },
    {
      element: '#step2',
      intro: 'Here you can customize main theme, and open priorities management modal',
      position: 'left',
    },
    {
      element: '#step3',
      intro: 'Here you can check tasks statistic for all and each category',
      position: 'top',
    },
    {
      element: '#step4',
      intro: 'Here you can add new task and search current task by text, status and priority',
      position: 'bottom',
    },
    {
      element: '#step5',
      intro: 'Here you can check tasks details and have an ability to edit and remove current task',
      position: 'left',
    },
    {
      element: '#step6',
      intro: 'Here you can change tasks count displayed per page',
    },
  ];

  public static readonly THEME_IMAGES = ['sidebar-1.jpg', 'sidebar-2.jpg', 'sidebar-3.jpg', 'sidebar-4.jpg'];

  public static readonly THEME_COLORS = [
    {
      name: 'purple',
      value: 'purple',
    },
    {
      name: 'azure',
      value: 'azure',
    },
    {
      name: 'green',
      value: 'green',
    },
    {
      name: 'warning',
      value: 'orange',
    },
    {
      name: 'danger',
      value: 'danger',
    },
    {
      name: 'rose',
      value: 'rose',
    },
  ];
}
