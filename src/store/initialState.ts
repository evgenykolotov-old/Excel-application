import { clone } from '../core/utils';
import { State, Styles } from '../shared/State';

export const defaultTitle = 'Новая таблица';

export const defaultStyles: Styles = {
  textAlign: 'left',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
}

const defaultState: State = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
  stylesState: {},
  openedDate: new Date().toJSON(),
}

const normalize = (state: State): State => ({
  ...state, currentStyles: defaultStyles, currentText: ''
})

export function normalizeInitialState(state: State): State {
  return state ? normalize(state) : clone(defaultState);
}
