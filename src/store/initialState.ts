import { clone } from '../core/utils';
import { State } from '../shared/State';
import { defaultStyles, defaultTitle } from '../constants';

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
