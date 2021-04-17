import Component, { html, css } from '../script/Component.js';
import { updateChildrenProperty, updateChildrenElement } from '../script/DOM.js';

const style = css`
  :host {
    display: inline-block;
    vertical-align: middle;
  }

  label {
    display: flex;
    position: relative;
  }

  slot {
    font-family: var(--font);
  }

  label:before {
    display: block;
    /* position: relative; */
    content: '';
    height: 20px;
    width: 20px;
    background: none;
    border: 1px solid #898989;
    border-radius: 50%;
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

  #checkbox:checked ~ label:before {
    border-color: #6fbeb5;
  }

  label:hover:before {
    border-color: #d5d5d5;
  }

  #checkbox ~ label:after {
    content: '';
    display: block;
    margin: 10px;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: #6fbeb5;
    opacity: 0;
    transition: .3s ease all;
    position: absolute;
    cursor: pointer;
    top: 1px;
    left: 1px;
  }

  :host([right]) #checkbox ~ label:after {
    left: auto;
    right: 1px;
  }

  #checkbox:checked ~ label:after {
    opacity: 1;
    margin: 2px;
    height: 16px;
    width: 16px;
  }

  #checkbox:disabled + label:before {
    background: #d5d5d5;
    pointer-events: none;
  }`;

const attributes = {
  // @TODO: exclude from ui-radio-group array<string>
};
const properties = {
  /** */
    checked(root, value) {
      updateChildrenElement(root, '#checkbox', 'checked', [true, ''].includes(value));
    },

  /** */
    disabled(root, value) {
      updateChildrenElement(root, '#checkbox', 'disabled', [true, ''].includes(value));
    },

  /** */
    right() {}
  }

/** {UIRadio} @class
  * @description Отображение блока простого текста
  */
  export default class UIRadio extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <input type="checkbox" id="checkbox" hidden />
        <label for="checkbox"><slot></slot></label>
      </template>`;

  /** Создание компонента {UIRadio} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIRadio} текущий компонент
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

Component.init(UIRadio, 'ui-radio', { attributes, properties });
