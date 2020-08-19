import Component, {html, css} from '../script/Component.js';

const style = css`
  :host {
    display: block;
  }

  slot {
    display: flex;
  }

  ::slotted(*) {
    margin: 2px;
    width: 100%;
  }`;

const attributes = {}
const properties = {}

/** {UIKeyboard} @class Клавиатура
  * @description Набор кнопок и других элементов для совершения действий
  */
  export default class UIKeyboard extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIKeyboard} @constructor
    * @param {array} items список элементов клавиатуры
    */
    constructor(...items) {
      super();
      if (items.length) items.forEach(item => this.appendChild(item));
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIKeyboard} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIKeyboard, 'ui-keyboard', {attributes, properties});
