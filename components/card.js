import Component, {html, css} from '../script/Component.js';

const style = css`
  :host {
    --radius: 3px;

    display: block;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    border: none;
    box-sizing: border-box;
    font-size: 1.1em;
    font-weight: 100;
    outline: none;
    border-radius: var(--radius);
    /* background: white; */
    padding: 0;
    overflow: hidden;
  }
  slot {
    display: block;
  }
  slot[name="action"] {
    padding: 0 1em 1em;
  }
  ::slotted(ui-button) {
    margin-right: 0.4em;
  }`;

const attributes = {}
const properties = {}

/** {UICard} @class
  * @description Отображение блока простого текста
  */
  export default class UICard extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot name="header"></slot>
        <slot></slot>
        <slot name="action"></slot>
        <slot name="expand"></slot>
      </template>`;

  /** Создание компонента {UICard} @constructor
    */
    // constructor() {
    //   super();
    // }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UICard} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UICard, 'ui-card', {attributes, properties});
