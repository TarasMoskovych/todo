import { Color } from 'src/app/models';

export interface ThemesState {
  readonly color: Color;
  readonly image: string
  readonly showDialog: boolean;
}

export const initialThemesState: ThemesState = {
  color: null,
  image: null,
  showDialog: false,
};
