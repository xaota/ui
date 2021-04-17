import Component, { html, css } from '../script/Component.js';

const style = css`
  :host {
    display: block;
    padding: 8px 8px 8px 23px;
    box-shadow: inset 3px 0 0 0 var(--color-text-addition);
  }
  slot {
    display: block;
    font-style: italic;
    font-family: var(--font);
  }`;

const attributes = {}
const properties = {}

/** {UIBlockquote} @class
  * @description Отображение блока с текстом цитатой
  */
  export default class UIBlockquote extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIBlockquote} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIBlockquote} @this
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIBlockquote, 'ui-blockquote', { attributes, properties });
