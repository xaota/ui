import Component, {html, css} from '../script/Component.js';
import UIButton from './button.js';
import UIIcon   from './icon.js';
import {updateChildrenAttribute} from '../script/DOM.js';

const style = css`
  :host {
    display: inline-block;
  }
  ui-button {
    width: 100%;
  }`;

const attributes = {
  /** */
    text(root, value) { updateChildrenAttribute(root, 'ui-button', 'text', value) },
  /** */
    mode(root, value) { updateChildrenAttribute(root, 'ui-button', 'mode', value) },
  }
const properties = {
  /** */
    disabled(root, value) { updateChildrenAttribute(root, 'ui-button', 'disabled', value) }
  }

/** {UIButtonIcon} @class Кнопка-иконка
  */
  export default class UIButtonIcon extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-button><ui-icon><slot></slot></ui-icon></ui-button>
      </template>`;

  /** Создание компонента {UIButtonIcon} @constructor
    * @param {string?} icon Название иконки
    */
    constructor(icon) {
      super();
      if (icon) this.innerText = icon;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIButtonIcon} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIButtonIcon, 'ui-button-icon', {attributes, properties});
