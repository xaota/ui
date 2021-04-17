import Component, { html, css } from '../script/Component.js';

const style = css`
  :host {
    display: block;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
    margin: 0;
    flex-shrink: 0;
  }

  :host([middle]) {
    margin-left: 16px;
    margin-right: 16px;
  }

  :host([inset]) {
    margin-left: 72px;
  }

  /* :host[vertical] { ... } */

  slot {
    display: block;
    font-size: 0.75rem;
    font-family: var(--font);
    font-weight: 300;
    line-height: 1.66;
    letter-spacing: 0.03333em;
    color: #444;
  }

  :host(:not(:empty)) slot {
    margin-top: 6px;
    margin-left: 2em;
  }`;

const attributes = {}
const properties = {
  inset() {},
  middle() {}
}

/** {UIDivider} @class
  * @description Отображение блока простого текста
  */
  export default class UIDivider extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIDivider} @constructor
    * @param {object} options настройки
    */
    constructor(options = {}) {
      super();
      if (options.inset)  this.inset  = true;
      if (options.middle) this.middle = true;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIDivider} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIDivider, 'ui-divider', { attributes, properties });
