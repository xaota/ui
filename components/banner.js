import Component, {html, css} from '../script/Component.js';

const style = css`
  :host {
    display: grid;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 1em;
    grid-template-areas: "avatar content" ". action";
    grid-template-columns: fit-content(48px);
    grid-column-gap: 10px;
  }
  slot[name="avatar"] {
    grid-area: avatar;
    display: block;
  }
  slot:not([name]) {
    grid-area: content;
    display: block;
  }
  slot[name="action"] {
    display: block;
    grid-area: action;
    justify-self: end;
  }
  ::slotted(p), ::slotted(ui-text), ::slotted(ui-paragraph) {
    margin: 0;
  }`;

const attributes = {}
const properties = {}

/** {UIBanner} @class
  * @description Отображение блока простого текста
  */
  export default class UIBanner extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot name="avatar"></slot>
        <slot></slot>
        <slot name="action"></slot>
      </template>`;

  /** Создание компонента {UIBanner} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIBanner} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIBanner, 'ui-banner', {attributes, properties});
