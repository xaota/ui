export { html, css, url } from './Template.js';

const store = Symbol('store');
const state = Symbol('state');

/** {Component} @class @extends {HTMLElement}
  *
  */
  export default class Component extends HTMLElement {
  /** {Component} создание web-component @constructor
    * @param {ShadowRootMode} mode тип ShadowDOM создаваемого узла
    */
    constructor(mode = 'open') {
      super();
      this[store] = null;
      this[state] = 'created';
      this.attachShadow({ mode });
    }

  /** state @readonly */
    get state() {
      return this[state];
    }

  /** store */
    store(...data) { // component.store({что-то}) - запись, store = component.store() - чтение
      if (data.length === 0) return this[store] || {};

      this[store] = data.length === 1 && data[0] === null
        ? null
        : Object.assign({}, this[store], ...data);

      return this.state === 'mounted'
        ? this.render(this.shadowRoot)
        : this;
    }

  /** event */
    event(event, detail = null) { // Отправка событий во внешний DOM // component.event('custom-event', {data: value})
      const options = { bubbles: true, composed: true };
      event = detail !== null || (!event.type && event.includes('-'))
        ? new CustomEvent(event, { detail, ...options })
        : typeof event === 'object' ? event : new Event(event);
      this.dispatchEvent(event);
      return this;
    }

  /** connectedCallback */
    connectedCallback() { // не юзать напрямую
      if (!this.ownerDocument.defaultView) return; // !
      if (this.shadowRoot.firstChild) return; // ! loaded @TODO: перенос узла

      const template = this.constructor.template.content.cloneNode(true);
      this.ready(template)
      this.attach(template);
      this[state] = 'attached';
      this.mount(this.shadowRoot);
      this[state] = 'mounted';
      if (this[store]) this.render(this.shadowRoot);
      this.event('DOMContentLoaded');
    }

  /** disconnectedCallback */
    disconnectedCallback() { // удаление элемента из DOM
      this.unmount(this.shadowRoot); // ?
      this[state] = 'unmounted';
      // this.event('unload?');
      // if (!this.ownerDocument.defaultView) return; // !
      // полное удаление
      // const root = this.shadowRoot;
      // while (root.firstChild) root.removeChild(root.firstChild);
    }

  /** ready */
    ready(template) { // доступ к фрагмменту перед вставкой в DOM (если нужно)
      return this;
    }

  /** attach */
    attach(template) { // вставка фрагмента в DOM
      this.shadowRoot.appendChild(template);
      return this;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node ShadowRoot узел элемента
    * @param {object} attributes функции, вызываемые при изменении отслеживаемых атрибутов
    * @param {object} properties функции, вызываемые при изменении отслеживаемых свойств
    * @return {Component} @this
    */
    mount(node, attributes = {}, properties = {}) { // самая ходовая функция, вешать внуренние события здесь и т д (может быть недоступен shadowRoot дочерних веб-компонент)
      const exec = map => key => map[key].call(this, node, this[key]);
      Object.keys(attributes).forEach(exec(attributes));
      Object.keys(properties).forEach(exec(properties));
      return this;
    }

  /** перерендеринг компонента, если требуется / render */
    render(node) {
      return this;
    }

  /** unmount */
    unmount(node) { // тут типа можно отписаться от событий, но вроде пофиг
      return this;
    }

  /** is @static */
    static is(component, ...constructors) { // Является ли узел элементом определенного класса
      if (typeof component !== 'object') component = document.createElement(component);
      const is = constructor => constructor
        ? component instanceof constructor
        : Object.getPrototypeOf(component.constructor) !== HTMLElement && component.constructor !== HTMLElement;
      return constructors.some(is);
    }

  /** define @static */
    static async define(name, constructor, options = undefined) { // сохраняет привязку класса-компонента к html-тегу
      if (Component.exist(name)) return;
      window.customElements.define(name, constructor, options);
    }

  /** exist @static */
    static exist(component) { // проверка существования привязки
      return Boolean(customElements.get(component));
    }

  /** properties @static */
    static properties(constructor, ...list) { // навешивает свойства (boolean) элемента + геттеры и сеттеры
      list.forEach(property => setProperty(constructor.prototype, property));
    }

  /** attributes @static */
    static attributes(constructor, ...list) { // навешивает атрибуты (string) элемента + геттеры и сеттеры
      list.forEach(attribute => setAttribute(constructor.prototype, attribute));
    }

  /** init @static */
    static init(constructor, name, { attributes = {}, properties = {} }) { // сокращенная инициализация компонента
      const fields = [...Object.keys(attributes), ...Object.keys(properties)];

      Object.defineProperties(constructor, {
        /** Отслеживаемые атрибуты / observedAttributes @readonly @static
          * @return {array} список изменяемых атрибутов компонента
          */
        observedAttributes: {
          get: () => fields,
          enumerable: false
        },

        /** Является ли узел элементом {Component*} / is @static
          * @param {HTMLElement} node проверяемый узел
          * @return {boolean} node instanceof Component*
          */
        is: {
          value: node => Component.is(node, constructor),
          enumerable: false
        }
      });

      /** Обновление отслеживаемого атрибута / attributeChangedCallback @lifecycle
        * @param {string} name     Название атрибута
        * @param {string} previous Предыдущее значение ?null
        * @param {string} current  Устанавливаемое значение
        */
      Object.defineProperty(constructor.prototype, 'attributeChangedCallback', {
      /** / value */
        value(name, previous, current) {
          const root = this.shadowRoot;
          if (current === previous) return;
          if (name in attributes) attributes[name].call(this, root, current, previous);
          if (name in properties) properties[name].call(this, root, current, previous);
        }
      });

      Component.attributes(constructor, ...Object.keys(attributes));
      Component.properties(constructor, ...Object.keys(properties));
      Component.define(name, constructor);
    }
  }

// #region [Private]
/** / setAttribute */
  function setAttribute(prototype, attribute) {
    Object.defineProperty(prototype, attribute, {
    /** / */
      get() { return this.getAttribute(attribute) || undefined },
    /** / */
      set(value) {
        value === null
          ? this.removeAttribute(attribute)
          : this.setAttribute(attribute, value);
      }
    });
  }

/** / setProperty */
  function setProperty(prototype, property) {
    Object.defineProperty(prototype, property, {
    /** / */
      get() { return this.hasAttribute(property) },
    /** / */
      set(value) {
        value === false // null?
          ? this.removeAttribute(property)
          : this.setAttribute(property, '');
      }
    });
  }
// #endregion
