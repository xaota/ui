import Component, { html, css } from '../script/Component.js';
import UIButton  from './button.js';
import UITooltip from './tooltip.js';
import { updateChildrenAttribute, updateChildrenProperty } from '../script/DOM.js';

const style = css`
  :host {
    display: inline-block;
  }

  ui-button {
    width: 100%;
  }`;

const attributes = {
    text(root, value) { updateChildrenAttribute(root, 'ui-button', 'text', value) },
    mode(root, value) { updateChildrenAttribute(root, 'ui-button', 'mode', value) },
    content(root, value) { updateChildrenAttribute(root, 'ui-tooltip', 'content', value) },
    x(root, value) { updateChildrenAttribute(root, 'ui-tooltip', 'x', value) },
    y(root, value) { updateChildrenAttribute(root, 'ui-tooltip', 'y', value) }
  }
const properties = {
    disabled(root, value) { updateChildrenProperty(root, 'ui-button', 'disabled', value) }
  }

/** {UIButtonTooltip} @class
  * @description Отображение блока простого текста
  */
  export default class UIButtonTooltip extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-tooltip>
          <ui-button><slot></slot></ui-button>
        </ui-tooltip>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIButtonTooltip} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIButtonTooltip, 'ui-button-tooltip', { attributes, properties });
