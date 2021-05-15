import * as actions from './types';
import { DataState } from '../shared/State';

type Action = (data?: DataState) => ActionData;

export interface ActionData {
  type: string;
  data?: DataState;
}

export const tableResize: Action = (data) => ({
  type: actions.TABLE_RESIZE,
  data
});

export const changeText: Action = (data) => ({
  type: actions.CHANGE_TEXT,
  data
});

export const changeStyles: Action = (data) => ({
  type: actions.CHANGE_STYLES,
  data,
});

export const applyStyles: Action = (data) => ({
  type: actions.APPLY_STYLE,
  data
});

export const changeTitle: Action = (data) => ({
  type: actions.CHANGE_TITLE,
  data
});

export const updateDate: Action = () => ({
  type: actions.UPDATE_DATE
});
