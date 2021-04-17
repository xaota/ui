// @todo:

/** */
  export default function $(selector, root = document) {
    if (selector === root) return selector;
    return typeof selector === 'object'
      ? selector
      : root.querySelector(selector);
  }

/** */
  export function $$(selector, root = document) {
    if (selector === root) return selector;
    return typeof selector === 'object'
      ? selector
      : [...root.querySelectorAll(selector)];
  }

/** */
  export function updateChildrenElement(root, selector, attribute, value) {
    const children = $(selector, root);
    if (!children) return;
    children[attribute] = value || '';
  }

/** */
  export function updateChildrenAttribute(root, selector, attribute, value) {
    const children = $(selector, root);
    if (!children) return;
    const remove = value === null || value === false;
    remove
      ? children.removeAttribute(attribute)
      : children.setAttribute(attribute, value);
    if (children[attribute] && !remove) children[attribute] = value;
  }

/** */
  export function updateChildrenProperty(root, selector, property, value = false) {
    const children = $(selector, root);
    if (!children) return;
    value === '' || Boolean(value)
      ? children.setAttribute(property, '')
      : children.removeAttribute(property)
  }

/** */
  export function updateChildrenHTML(root, selector, value = '') {
    const children = $(selector, root);
    if (!children) return;
    children.innerHTML = value;
  }

/** */
  export function updateChildrenText(root, selector, value = '') {
    const children = $(selector, root);
    if (!children) return;
    children.innerText = value;
  }

/** */
  export function updateChildrenClass(root, selector, value = {}) {
    const children = $(selector, root);
    if (!children) return;
    Object.keys(value).forEach(c => children.classList[value[c] ? 'add' : 'remove'](c));
  }

/** */
  export function cssVariable(selector, name, value, root = document) {
    const element = $(selector, root);
    if (!element) return;
    if (name.charAt(0) !== '-') name = '--' + name;
    if (value) element.style.setProperty(name, value);
    return getComputedStyle(element).getPropertyValue(name);
  }

/**
  */
  export function clear(node) {
    while (node.firstChild) node.firstChild.remove();
    return node;
  }

/** / slottedValue */
  export function slottedValue(slot) {
    let self = slot;
    do {
      self = self.assignedNodes()[0];
    } while (self instanceof HTMLSlotElement);

    const value = self?.nodeValue;
    if (!value) return;

    return value.trim();
  }

/** */
  export function pointerOffset(element, event) {
    const target = event.target;
    const root   = element.getBoundingClientRect();
    const host   =  target.getBoundingClientRect();
    return {
      x: event.offsetX + (host.left - root.left),
      y: event.offsetY + (host.top  - root.top)
    };
  }
