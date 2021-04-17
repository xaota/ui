import Component, { html, css } from '../script/Component.js';

const style = css`
  :host {
    display: block;
    padding: 8px 0;
  }`;

const attributes = {}
const properties = {}

/** {UIList} @class
  * @description Отображение блока простого текста
  */
  export default class UIList extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIList} @constructor
    */
    constructor() { // virtualisation?
      super();
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIList} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIList, 'ui-list', { attributes, properties });
