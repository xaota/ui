import Component, {html, css} from '../script/Component.js';

const style = css`
  :host {
    display: grid;
    background: var(--background-panel);
    box-sizing: border-box;
    padding: 1em;
    grid-template-areas: "avatar content" ". action";
    grid-template-columns: fit-content(48px);
    grid-column-gap: 10px;
    box-shadow: /*0px 3px 5px -1px rgba(0,0,0,0.2),
                0px 6px 10px 0px rgba(0,0,0,0.14),*/
                0px 1px 18px 0px rgba(0,0,0,0.12);
    /* border: --background-dark */
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
