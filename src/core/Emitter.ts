import { EventEmitter, EventListener } from '../shared/Emitter';

class Emitter implements EventEmitter {
  private listeners: EventListener = {};

  public emit(event: string, ...args: unknown[]): boolean {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach(listener => {
      listener(...args);
    });
    return true;
  }

  public subscribe(event: string, fn: () => unknown): () => void {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] = this.listeners[event].filter((listener: unknown) => listener !== fn);
    }
  }
}

export default Emitter;
