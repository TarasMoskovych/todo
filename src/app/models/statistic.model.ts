export interface Statistic extends StatisticData {
  value: string;
}

export interface StatisticData {
  key: string;
  icon: string;
  title: string;
  percent?: boolean;
  statusClass?: string;
  wrapperClass?: string;
}
