export interface Theme {
  color: Color;
  darkTheme: boolean;
  image: string;
}

export interface Color {
  name: string;
  value: string;
}

export interface ChartTheme {
  borderColor: ChartItemColor;
  backgroundColor: ChartItemColor;
  pointBackgroundColor: ChartItemColor;
}

export interface ChartItemColor {
  default: string;
  dark: string
}
