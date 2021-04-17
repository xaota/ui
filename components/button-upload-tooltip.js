import Component, { html, css } from '../script/Component.js';
import UIButtonUpload from './button-upload.js';
import UITooltip      from './tooltip.js';
import { updateChildrenAttribute, updateChildrenProperty } from '../script/DOM.js';

const style = css`
  :host {
    display: inline-block;
  }
  ui-button-upload {
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
    multiple(root, value) { updateChildrenProperty(root, 'ui-button-upload', 'multiple', value) }
  }

/** {UIButtonUploadTooltip} @class
  * @description Отображение блока простого текста
  */
  export default class UIButtonUploadTooltip extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-tooltip>
          <ui-button-upload><slot></slot></ui-button-upload>
        </ui-tooltip>
      </template>`;

  /** Создание компонента {UIButtonUploadTooltip} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIButtonUploadTooltip} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIButtonUploadTooltip, 'ui-button-upload-tooltip', { attributes, properties });
