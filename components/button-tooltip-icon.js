import Component, {html, css} from '../script/Component.js';
import UIButton  from './button.js';
import UIIcon    from './icon.js';
import UITooltip from './tooltip.js';
import {updateChildrenAttribute, updateChildrenProperty} from '../script/DOM.js';

const style = css`
  :host {
    display: inline-block;
  }

  ui-button-icon {
    width: 100%;
  }`;

const attributes = {
    text(root, value) {updateChildrenAttribute(root, 'ui-button', 'text', value)},
    mode(root, value) {updateChildrenAttribute(root, 'ui-button', 'mode', value)},
    content(root, value) {updateChildrenAttribute(root, 'ui-tooltip', 'content', value)},
    x(root, value) {updateChildrenAttribute(root, 'ui-tooltip', 'x', value)},
    y(root, value) {updateChildrenAttribute(root, 'ui-tooltip', 'y', value)}
  }
const properties = {
    disabled(root, value) {updateChildrenAttribute(root, 'ui-button', 'disabled', value)}
  }

/** {UIButtonTooltipIcon} @class
  * @description Отображение блока простого текста
  */
  export default class UIButtonTooltipIcon extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-tooltip>
          <ui-button-icon><slot></slot></ui-button-icon>
        </ui-tooltip>
      </template>`;

  /** Создание компонента {UIButtonTooltipIcon} @constructor
    * @param {string} icon название иконки
    * @param {string} content текст подсказки
    * @param {string} x положение по горизонтали
    * @param {string} y положение по вертикали
    */
    constructor(icon, content, x, y) {
      super();
      if (icon) this.innerText = icon;
      if (content) this.content = content;
      if (x) this.x = x;
      if (y) this.y = y;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIButtonTooltipIcon} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIButtonTooltipIcon, 'ui-button-tooltip-icon', {attributes, properties});
