import Emitter from '../core/Emitter';
import Store from '../core/Store';

export interface ExcelOptions {
    components: any[],
    store: Store
}

export interface ComponentOptions {
    emitter: Emitter;
    store: Store
}

export interface ExcelComponentOptions extends ComponentOptions {
    name: string;
    listeners: string[],
    subscribe: string[],
}