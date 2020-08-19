import Component, {html, css} from '../script/Component.js';
import {updateChildrenProperty, updateChildrenElement} from '../script/DOM.js';

const style = css`
  :host {
    display: inline-block;
    vertical-align: middle;
  }

  label {
    display: flex;
  }

  slot {
    font-family: var(--font);
  }

  label:before {
    display: inline-block;
    content: '';
    height: 20px;
    width: 20px;
    background: none;
    border: 1px solid #898989;
    border-radius: 2px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  :host([right]) label {
    flex-direction: row-reverse;
  }

  :host([right]) label:before {
    margin-left: 0.4em;
  }
  :host(:not([right])) label:before {
    margin-right: 0.4em;
  }

  label:hover:before {
    border-color: #d5d5d5;
  }

  #checkbox:checked + label:before {
    background: #6fbeb5 url('../../icons/light/check.svg') center center;
  }

  #checkbox:disabled + label:before {
    background: #d5d5d5;
    pointer-events: none;
  }`;

const attributes = {}
const properties = {
  /** */
    checked(root, value) {
      updateChildrenProperty(root, '#checkbox', 'checked', [true, ''].includes(value))
    },

  /** */
    disabled(root, value) {
      updateChildrenElement(root, '#checkbox', 'disabled', [true, ''].includes(value));
    },

  /** */
    right() {}
  }

/** {UICheckbox} @class
  * @description Отображение блока простого текста
  */
  export default class UICheckbox extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <input type="checkbox" id="checkbox" hidden />
        <label for="checkbox"><slot></slot></label>
      </template>`;

  /** Создание компонента {UICheckbox} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UICheckbox} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const checkbox = node.querySelector('#checkbox');
      checkbox.addEventListener('change', _ => {
        this.checked = checkbox.checked;
        this.event('change');
      });
      return this;
    }
  }

Component.init(UICheckbox, 'ui-checkbox', {attributes, properties});
