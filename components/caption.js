import Component, {html, css} from '../script/Component.js';

const style = css`
  :host {
    display: block;
    font-size: 24px;
    font-family: var(--font);
    font-weight: 300;
  }
  :host([size="small"]) {
    font-size: 18px;
  }
  :host([size="large"]) {
    font-size: 30px;
  }`;

const attributes = {}
const properties = {}

/** {UICaption} @class
  * @description Отображение блока простого текста
  */
  export default class UICaption extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UICaption} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UICaption} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UICaption, 'ui-caption', {attributes, properties});
