import { StatisticData } from 'src/app/models';

export class Constants {

  public static readonly VALIDATION_PATTERN = new RegExp(['^([a-z0-9,().\'"?!-]+\\s)*', '[a-z0-9,().\'"?!-]+$'].join(''),'i');

  public static readonly PAGE_SIZE_OPTIONS = [5, 10, 50, 100];

  public static readonly WITHOUT_PRIORITY = 'empty';

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

  public static FOOTER_LINKS = [
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

}
