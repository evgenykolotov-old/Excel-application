export interface State {
    title: string;
    colState: ColState;
    rowState: RowState;
    dataState: ContentState;
    currentText: string;
    currentStyles: Styles;
    stylesState: CurrentStyles;
    openedDate: string;
}

export interface ColState {
    [id: string]: string;
}

export interface RowState {
    [id: string]: string;
}

export interface ContentState {
    [id: string]: string;
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
    [id: string]: Styles
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

export type DataState = ColState | RowState | ContentState | Styles | CurrentStyles | string;
