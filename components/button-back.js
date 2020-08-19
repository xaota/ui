import Component, {html, css} from '../script/Component.js';
import UIButton from './button.js';
import UIIcon   from './icon.js';

const style = css`
  :host {
    display: inline-block;
  }

  ui-button {
    width: 100%;
  }`;

const attributes = {}
const properties = {}

/** {UIButtonBack} @class
  * @description Отображение блока простого текста
  */
  export default class UIButtonBack extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-button>
          <ui-icon>keyboard_arrow_left</ui-icon>
          <slot></slot>
        </ui-button>
      </template>`;

  /** Создание компонента {UIButtonBack} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIButtonBack} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIButtonBack, 'ui-button-back', {attributes, properties});
