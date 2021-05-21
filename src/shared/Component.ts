import { Dom } from '../core/Dom';
import Emitter from '../core/Emitter';
import Page from '../core/Page';
import Store from '../core/Store';
import { State, Styles } from './State';

export interface Component {
    init: () => void;
    toHTML: () => string;
    storeChanged: (data: State) => void;
    isWatching: (key: keyof State) => boolean
}

export interface ExcelOptions {
    components: Component[],
    store: Store
}

export interface ComponentOptions {
    emitter: Emitter;
    store: Store
}

export interface ExcelComponentOptions extends ComponentOptions {
    name: string;
    listeners: string[],
    subscribe: Array<keyof State>,
}

export type Subscriber = (data?: Styles | Dom | string) => void;
export type Listener = (state: State) => void;
export type Unsubscriiber = () => void;
export type Routes = { excel: Page, dashboard: Page }; 