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

interface ColState {
    [key: number]: string;
}

interface RowState {
    [key: number]: string;
}

interface CurrentStyles {
    [key: string]: string
}

interface ColResizeState {
    col?: ResizeData;
}

interface RowResizeState {
    row?: ResizeData;
}

type ResizeState = ColResizeState | RowResizeState;

interface ResizeData {
    type: 'col' | 'row';
    id: string;
    value: number;
}

export type DataState = ColState | RowState | CurrentStyles | string;