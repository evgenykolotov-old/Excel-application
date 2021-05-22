import { Subscriber } from '../shared/Component';
import { Styles } from '../shared/State';
import { Dom } from './Dom';

export interface EventListener {
  [key: string]: Subscriber[];
}

class Emitter {
  private listeners: EventListener = {};

  public emit(event: string, data?: Dom | Styles | string): boolean {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach(listener => {
      listener(data);
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
