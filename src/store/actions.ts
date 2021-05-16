import { ActionTypes } from './types';
import { ApplyStyle, ResizeState, Styles, ChangeTextData } from '../shared/State';

type ActionTableResize = (data: ResizeState) => TableResize;
type ActionChangeText = (data: ChangeTextData) => ChangeText;
type ActionChangeTitle = (data: string) => ChangeTitle;
type ActionUpdateDate = () => UpdateDate;
type ActionApplyStyles = (data: ApplyStyle) => ApplyStyles;
type ActionChangeStyles = (data: Styles) => ChangeStyles;

type TableResize = { type: ActionTypes.TABLE_RESIZE; data: ResizeState };
type ChangeText = { type: ActionTypes.CHANGE_TEXT; data: ChangeTextData };
type ChangeTitle = { type: ActionTypes.CHANGE_TITLE; data: string };
type UpdateDate = { type: ActionTypes.UPDATE_DATE };
type ApplyStyles = { type: ActionTypes.APPLY_STYLE; data: ApplyStyle };
type ChangeStyles = { type: ActionTypes.CHANGE_STYLES; data: Styles };

export const tableResize: ActionTableResize = (data) => ({
  type: ActionTypes.TABLE_RESIZE,
  data
});

export const changeText: ActionChangeText = (data) => ({
  type: ActionTypes.CHANGE_TEXT,
  data
});

export const changeStyles: ActionChangeStyles = (data) => ({
  type: ActionTypes.CHANGE_STYLES,
  data,
});

export const applyStyles: ActionApplyStyles = (data) => ({
  type: ActionTypes.APPLY_STYLE,
  data
});

export const changeTitle: ActionChangeTitle = (data) => ({
  type: ActionTypes.CHANGE_TITLE,
  data
});

export const updateDate: ActionUpdateDate = () => ({
  type: ActionTypes.UPDATE_DATE
});

export type Action = TableResize | ChangeText | ChangeTitle | UpdateDate | ApplyStyles | ChangeStyles;
