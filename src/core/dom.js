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
