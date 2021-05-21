import { Subscriber } from '../shared/Component';
import { State } from '../shared/State';

export interface EventListener {
  [key: string]: Array<(...arg: Array<keyof State>) => void>;
}

class Emitter {
  private listeners: EventListener = {};

  public emit(event: string, ...args: Array<keyof State>): boolean {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach(listener => {
      listener(...args);
    });
    return true;
  }

  public subscribe(event: string, fn: Subscriber): () => void {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] = this.listeners[event].filter(listener => listener !== fn);
    }
  }
}

export default Emitter;
