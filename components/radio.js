import Component, {html, css} from '../script/Component.js';
import {updateChildrenProperty, updateChildrenElement} from '../script/DOM.js';

const style = css`
  :host {
    display: inline-block;
  }

  slot {
    display: inline;
  }

  label {
    position: relative;
    display: block;
    height: 20px;
    width: 20px;
    background: none;
    border: 1px solid #898989;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  label:hover {
    border-color: #d5d5d5;
  }

  #checkbox:checked ~ label {
    border-color: #6fbeb5;
    /* box-shadow: inset 0 0 0 1px #898989; */
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
  }

  #checkbox:checked ~ label:after {
    opacity: 1;
    margin: 2px;
    height: 16px;
    width: 16px;
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

Component.init(UIRadio, 'ui-radio', {attributes, properties});
