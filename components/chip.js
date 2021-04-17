import Component, { html, css } from '../script/Component.js';
import { updateChildrenText }   from '../script/DOM.js';
import UIIcon   from './icon.js';
import UIAvatar from './avatar.js';

const style = css`
  :host {
    display: inline-block;

    --color-text:   #fff;
    --color-static: #e10050;
    --color-active: #f51c68;
    --color-button: #f70c5e;
    --color-action: #cf0049;
  }

  :host([outline]) {
    --color-text: #222;
    --color-button: #f6f6f6;
    --color-action: #e9aabc;
  }

  :host div.root {
    background-color: var(--color-static);
    border: none;
    border-radius: 16px;
    box-sizing: border-box;
    color: var(--color-text);
    cursor: default;
    display: block;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 14px;
    height: 32px;
    outline: none;
    padding: 6px 16px;
    line-height: 20px;
    text-decoration: none;
    white-space: nowrap
  }

  :host div.root:hover {
    background-color: var(--color-active);
  }

  :host([outline]) div.root {
    background: none;
    border: 1px solid var(--color-static);
    padding: 5px 15px;
    color: var(--color-foreground);
  }

  :host([outline]) div.root:hover {
    background-color: none;
    border-color: var(--color-active);
  }

  button.action {
    display: none;
    height: 24px;
    width: 24px;
    margin-left: 4px;
    margin-right: -12px;
    margin-top: -2px;
    cursor: pointer;
    border-radius: 12px;
    border: none;
    background-color: var(--color-button);
    text-align: center;
    outline: none;
    vertical-align: top;
    padding: 0;
  }

  button.action:hover {
    background-color: var(--color-action);
  }

  button.action > ui-icon {
    display: inline;
  }

  :host([outline]) button.action > ui-icon {
    color: var(--color-static);
  }

  :host([action]) button.action {
    display: inline;
  }

  slot[name="avatar"]::slotted(*) {
    width: 32px;
    height: 32px;
    margin-right: 4px;
    margin-left: -16px;
    margin-top: -6px;
    vertical-align: top;
  }`;

const attributes = {
  value() {},
  action(root, value) { updateChildrenText(root, 'div.root > button.action > ui-icon', value) }
}
const properties = {}

/** {UIChip} @class
  * @description Отображение блока простого текста
  */
  export default class UIChip extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div class="root">
          <slot name="avatar"></slot>
          <slot></slot>
          <button class="action"><ui-icon></ui-icon></button>
        </div>
      </template>`;

  /** Создание компонента {UIChip} @constructor
    * @param {string} html текст на фишке
    * @param {string} action иконка действия
    */
    constructor(html, action) {
      super();
      if (html) this.innerHTML = html;
      if (action) this.action = action;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIChip} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const action = node.querySelector('div.root > button.action');
      action.addEventListener('click', e => swapEvent.call(this, e, 'action', action.querySelector('ui-icon').innerHTML));
      return this;
    }
  }

Component.init(UIChip, 'ui-chip', { attributes, properties });

// #region [Private]
/** / swapEvent */
  function swapEvent(origin, event, detail) {
    // origin.stopImmediatePropagation();
    origin.preventDefault(); // действие браузера
    origin.stopPropagation();
    // origin.cancelBubble = true;
    return this.event(event, detail);
  }
// #endregion
