import Component, { html, css } from '../script/Component.js';

const style = css`
  :host {
    display: block;
  }
  slot {
    display: block;
  }
  slot[name="description"] {
    padding: 0.4em 1em 0;
  }
  slot[name="description"]::slotted(*) {
    padding-bottom: 8px;
  }
  ::slotted(img) {
    width: 100%;
  }
  ::slotted(ui-text) {
    font-size: 14px;
  }`;

const attributes = {}
const properties = {}

/** {UIFigure} @class
  * @description Отображение блока простого текста
  */
  export default class UIFigure extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <slot name="description"></slot>
      </template>`;

  /** Создание компонента {UIFigure} @constructor
    */
    // constructor() {
    //   super();
    // }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIFigure} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIFigure, 'ui-figure', { attributes, properties });
