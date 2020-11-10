import { Color } from 'src/app/models';

export interface ThemesState {
  readonly color: Color;
  readonly darkTheme: boolean;
  readonly image: string
  readonly showDialog: boolean;
}

export const initialThemesState: ThemesState = {
  color: null,
  darkTheme: false,
  image: null,
  showDialog: false,
};
