import Component, {html, css} from '../script/Component.js';
import UIButtonUploadIcon from './button-upload-icon.js';
import UITooltip      from './tooltip.js';
import {updateChildrenAttribute, updateChildrenProperty} from '../script/DOM.js';

const style = css`
  :host {
    display: inline-block;
  }
  ui-button-upload-icon {
    width: 100%;
  }`;

const attributes = {
  /** */
    text(root, value) { updateChildrenAttribute(root, 'ui-button-upload', 'text', value) },
  /** */
    mode(root, value) { updateChildrenAttribute(root, 'ui-button-upload',  'mode', value) },
  /** */
    accept(root, value) { updateChildrenAttribute(root, 'ui-button-upload',  'accept', value) },
  /** */
    content(root, value) { updateChildrenAttribute(root, 'ui-tooltip', 'content', value) },
  /** */
    x(root, value) { updateChildrenAttribute(root, 'ui-tooltip', 'x', value) },
  /** */
    y(root, value) { updateChildrenAttribute(root, 'ui-tooltip', 'y', value) }
  }
const properties = {
  /** */
    disabled(root, value) { updateChildrenProperty(root, 'ui-button-upload',  'disabled', value) },
  /** */
    multiple(root, value) { updateChildrenProperty(root, 'ui-button-upload', 'multiple', value) },
  }

/** {UIButtonUploadTooltipIcon} @class
  * @description Отображение блока простого текста
  */
  export default class UIButtonUploadTooltipIcon extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-tooltip>
          <ui-button-upload-icon><slot></slot></ui-button-upload-icon>
        </ui-tooltip>
      </template>`;

  /** Создание компонента {UIButtonUploadTooltipIcon} @constructor
    * @param {string} icon название иконки
    * @param {string} content текст покдсказки
    * @param {string} x положение по горизонтали
    * @param {string} x положение по вертикали
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
    * @return {Component} @this {UIButtonUploadTooltipIcon} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIButtonUploadTooltipIcon, 'ui-button-upload-tooltip-icon', {attributes, properties});
