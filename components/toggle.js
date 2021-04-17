import Component, { html, css } from '../script/Component.js';
import { updateChildrenProperty, updateChildrenElement } from '../script/DOM.js';

const style = css`
  :host {
    display: inline-block;
  }

  label {
    position: relative;
    display: block;
    height: 20px;
    width: 44px;
    background: #898989;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  label:after {
    position: absolute;
    left: -2px;
    top: -3px;
    display: block;
    width: 26px;
    height: 26px;
    border-radius: 100px;
    background: #fff;
    box-shadow: 0px 3px 3px rgba(0,0,0,0.05);
    content: '';
    transition: all 0.3s ease;
  }

  label:active:after { transform: scale(1.15, 0.85); }

  #checkbox:checked ~ label { background: #6fbeb5; }

  #checkbox:checked ~ label:after {
    left: 20px;
    background: #179588;
  }

  #checkbox:disabled ~ label {
    background: #d5d5d5;
    pointer-events: none;
  }

  #checkbox:disabled ~ label:after { background: #bcbdbc; }`;

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

/** Поле-выключатель @class {UIToggle} @extends {Component}
  * @description Отображение блока простого текста
  */
  export default class UIToggle extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <input type="checkbox" id="checkbox" hidden />
        <label for="checkbox"></label>
      </template>`;

  /** Создание компонента {UIToggle} @constructor
    */
    // constructor() {
    //   super();
    // }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIToggle} текущий компонент
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

Component.init(UIToggle, 'ui-toggle', { attributes, properties });
