export class Dom {
  private $elem: HTMLElement;

  constructor(selector: string | HTMLElement) {
    if (typeof(selector) === 'string') {
      this.$elem = <HTMLElement>document.querySelector(selector);
    } else {
      this.$elem = selector;
    }
  }

  public html(html: string): Dom | string {
    if (typeof(html) === 'string') {
      this.$elem.innerHTML = html;
      return this;
    }
    return this.$elem.outerHTML.trim();
  }

  public text(text?: string): Dom | string {
    if (typeof(text) !== 'undefined') {
      this.$elem.textContent = text;
      return this;
    }
    if (this.$elem.tagName.toLowerCase() === 'input') {
      return (<HTMLInputElement>this.$elem).value.trim();
    }
    return (<string>this.$elem.textContent).trim();
  }

  public clear(): Dom {
    this.html('');
    return this;
  }

  public on(eventType: string, callback: EventListenerOrEventListenerObject): void {
    this.$elem.addEventListener(eventType, callback);
  }

  public off(eventType: string, callback: EventListenerOrEventListenerObject): void {
    this.$elem.removeEventListener(eventType, callback);
  }

  public append(node: HTMLElement | Dom): Dom {
    if (node instanceof Dom) {
      node = node.$elem;
    }
    this.$elem.appendChild(node);
    return this;
  }

  public closest(selector: string): Dom {
    return $(<HTMLElement>this.$elem.closest(selector));
  }

  public get data(): DOMStringMap {
    return this.$elem.dataset;
  }

  public getCoords(): DOMRect {
    return this.$elem.getBoundingClientRect();
  }

  public find(selector: string): Dom {
    return $(<HTMLElement>this.$elem.querySelector(selector));
  }

  public findAll(selector: string): NodeListOf<Element> {
    return this.$elem.querySelectorAll(selector);
  }

  public css(styles: CSSStyleDeclaration): void {
    Object.entries(styles).forEach(([key, value]) => {
      // eslint-disable-next-line
      this.$elem.style[key as any] = value;
    })
  }

  public addClass(className: string): Dom {
    this.$elem.classList.add(className);
    return this;
  }

  public removeClass(className: string): Dom {
    this.$elem.classList.remove(className);
    return this;
  }

  public id(parse?: boolean): { row: string; col: string } | string | undefined {
    if (parse) {
      const parsed = (<string>this.id()).split(':');
      return {
        row: parsed[0],
        col: parsed[1],
      }
    }
    return this.data.id;
  }

  public focus(): Dom {
    this.$elem.focus();
    return this;
  }

  public getStyles(styles = []): { [key: string]: string } {
    return styles.reduce((acc, item) => {
      (<string>acc[item]) = this.$elem.style[item];
      return acc;
    }, {});
  }
}

export function $(selector: HTMLElement | string): Dom {
  return new Dom(selector);
}

$.create = (tagName: string, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
}
