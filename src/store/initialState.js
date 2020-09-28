import { storage } from '@core/utils';
import { defaultStyles, defaultTitle } from '../constants';

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
  stylesState: {},
}

const normalize = state => ({
  ...state, currentStyles: defaultStyles, currentText: ''
})

export const initialState = storage('excel-state') ? normalize(storage('excel-state')) : defaultState;
