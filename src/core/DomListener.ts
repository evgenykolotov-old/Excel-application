abstract class DomListener {
  public $root: unknown;
  public listeners: string[] = [];

  constructor($root: unknown, listeners: string[]) {
    if (!$root) {
      throw new Error('No $root provided for DomListener!');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  protected initDOMListeners(): void {
    this.listeners.forEach(listener => {
      const method = this.getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name}`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    })
  }

  protected removeDOMListeners(): void {
    this.listeners.forEach(listener => {
      const method = this.getMethodName(listener);
      this.$root.off(listener, this[method]);
    })
  }

  private getMethodName(eventName: string): string {
    if (typeof(eventName) !== 'string') {
      return '';
    }
    return 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
  }
}

export default DomListener;
