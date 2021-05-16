interface ColState {
    [key: number]: string;
}

interface RowState {
    [key: number]: string;
}

export interface CurrentStyles {
    [key: string]: string
}

interface ColResizeState {
    col?: ResizeData;
}

interface RowResizeState {
    row?: ResizeData;
}

interface ResizeData {
    type: 'col' | 'row';
    id: string;
    value: number;
}

export interface ChangeTextData {
    id: number;
    value: string;
}

export interface Styles {
    textAlign?: TextAlign;
    fontWeight?: FontWeight;
    fontStyle?: FontStyle;
    textDecoration?: TextDecoration;
}

export interface ApplyStyle {
    id: number[];
    value: Styles;
}

type TextAlign = 'left' | 'center' | 'right';
type FontWeight = 'normal' | 'bold';
type FontStyle = 'normal' | 'italic';
type TextDecoration = 'none' | 'underline';

export type ResizeState = ColResizeState | RowResizeState;
export type DataState = ColState | RowState | CurrentStyles | string;

export interface State {
    title?: string;
    colState?: ColState;
    rowState?: RowState;
    dataState?: ResizeState;
    currentText?: string;
    currentStyles?: CurrentStyles;
    stylesState?: CurrentStyles;
    openedDate?: string;
    [key: string]: unknown;
}