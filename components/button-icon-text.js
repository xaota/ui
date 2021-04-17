import Component, { html, css } from '../script/Component.js';
import UIButton from './button.js';
import UIIcon   from './icon.js';
import { updateChildrenAttribute, updateChildrenText } from '../script/DOM.js';

const style = css`
  :host {
    display: inline-block;
  }
  ui-button {
    width: 100%;
  }`;

const attributes = {
  /** / icon */
    icon(root, value) { updateChildrenText(root, 'ui-icon', value) },
  /** / text */
    text(root, value) { updateChildrenAttribute(root, 'ui-button', 'text', value) },
  /** / mode */
    mode(root, value) { updateChildrenAttribute(root, 'ui-button', 'mode', value) }
  }
const properties = {
  /** / disabled */
    disabled(root, value) { updateChildrenAttribute(root, 'ui-button', 'disabled', value) }
  }

/** {UIButtonIconText} @class Кнопка-иконка с текстом
  */
  export default class UIButtonIconText extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-button><ui-icon></ui-icon><slot></slot></ui-button>
      </template>`;

  /** Создание компонента {UIButtonIconText} @constructor
    * @param {string?} icon название иконки
    * @param {string?} text текст на кнопке
    */
    constructor(icon, text) {
      super();
      if (icon) this.icon = icon;
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIButtonIcon} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIButtonIconText, 'ui-button-icon-text', { attributes, properties });
