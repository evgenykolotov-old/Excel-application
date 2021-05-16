export interface State {
    title?: string;
    colState?: ColState;
    rowState?: RowState;
    dataState?: ChangeTextData;
    currentText?: string;
    currentStyles?: Styles;
    stylesState?: CurrentStyles;
    openedDate?: string;
}

interface ColState {
    [key: string]: string;
}

interface RowState {
    [key: string]: string;
}

export interface ChangeTextData {
    id: string;
    value: string;
    [key: string]: string;
}

export interface Styles {
    textAlign?: TextAlign;
    fontWeight?: FontWeight;
    fontStyle?: FontStyle;
    textDecoration?: TextDecoration;
}

type TextAlign = 'left' | 'center' | 'right';
type FontWeight = 'normal' | 'bold';
type FontStyle = 'normal' | 'italic';
type TextDecoration = 'none' | 'underline';

export interface CurrentStyles {
    [key: string]: Styles
}

export interface ApplyStyle {
    ids: string[];
    value: Styles;
}

export interface ResizeState {
    type: 'col' | 'row';
    id: string;
    value: string;
}

export type DataState = ColState | RowState | ChangeTextData | Styles | CurrentStyles | string;
