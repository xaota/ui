import Component, { html, css } from '../script/Component.js';
import UIButtonUpload from './button-upload.js';
import UIIcon         from './icon.js';
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
    accept(root, value) { updateChildrenAttribute(root, 'ui-button-upload', 'accept', value) }
}
const properties = {
  /** */
    disabled(root, value) { updateChildrenProperty(root, 'ui-button-upload', 'disabled', value) },
  /** */
    multiple(root, value) { updateChildrenProperty(root, 'ui-button-upload', 'multiple', value) }
}

/** {UIButtonUploadIcon} @class
  * @description Отображение блока простого текста
  */
  export default class UIButtonUploadIcon extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-button-upload>
          <ui-icon><slot></slot></ui-icon>
        </ui-button-upload>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIButtonUploadIcon} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIButtonUploadIcon, 'ui-button-upload-icon', { attributes, properties });
