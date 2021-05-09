class Dom {
  constructor(selector) {
    if (typeof(selector) === 'string') {
      this.$elem = document.querySelector(selector);
    } else {
      this.$elem = selector;
    }
  }

  html(html) {
    if (typeof(html) === 'string') {
      this.$elem.innerHTML = html;
      return this;
    }
    return this.$elem.outerHTML.trim();
  }

  text(text) {
    if (typeof(text) !== 'undefined') {
      this.$elem.textContent = text;
      return this;
    }
    if (this.$elem.tagName.toLowerCase() === 'input') {
      return this.$elem.value.trim();
    }
    return this.$elem.textContent.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$elem.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$elem.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$elem;
    }
    if (Element.prototype.append) {
      this.$elem.append(node);
    } else {
      this.$elem.appendChild(node);
    }
    return this;
  }

  closest(selector) {
    return $(this.$elem.closest(selector));
  }

  get data() {
    return this.$elem.dataset;
  }

  getCoords() {
    return this.$elem.getBoundingClientRect();
  }

  find(selector) {
    return $(this.$elem.querySelector(selector));
  }

  findAll(selector) {
    return this.$elem.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object.entries(styles).forEach(([key, value]) => {
      this.$elem.style[key] = value;
    })
  }

  addClass(className) {
    this.$elem.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$elem.classList.remove(className);
    return this;
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: parseInt(parsed[0]),
        col: parseInt(parsed[1]),
      }
    }
    return this.data.id;
  }

  focus() {
    this.$elem.focus();
    return this;
  }

  getStyles(styles = []) {
    return styles.reduce((acc, item) => {
      acc[item] = this.$elem.style[item];
      return acc;
    }, {});
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
}
