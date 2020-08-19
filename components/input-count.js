import Component, {html, css} from '../script/Component.js';
import UIButtonIcon from './button-icon.js';
import UIInput      from './input.js';
import {updateChildrenProperty, updateChildrenAttribute} from '../script/DOM.js';

const style = css`
  :host {
    display: inline-block;
    min-width: 180px;
  }

  div {
    display: flex;
  }

  ui-input {
    margin-left: -0.3em;
    margin-right: -0.3em;
    flex-grow: 1;
  }

  ui-button-icon {
    margin-bottom: 0.3em;
    align-self: flex-end;
  }`;

const attributes = {
  /** */
    value(root, value, previous) {
      value = parseFloat(value);
      if (isNaN(value)) value = 0; // !
      const max = this.max ||  Infinity;
      const min = this.min || -Infinity;
      if (value > max) value = max;
      if (value < min) value = min;
      previous = parseFloat(previous) || 0;
      if (value === previous) return;
      updateChildrenAttribute(root, 'ui-input', 'value', value.toString());
      this.value = value;
    },
  /** */
    text(root, value) {
      updateChildrenAttribute(root, '#append', 'text', value);
      updateChildrenAttribute(root, '#remove', 'text', value);
    },

  /** */
    mode(root, value) {
      updateChildrenAttribute(root, '#append', 'mode', value);
      updateChildrenAttribute(root, '#remove', 'mode', value);
    },

  /** */
    placeholder(root, value) { updateChildrenAttribute(root, 'ui-input', 'placeholder', value) }
  }
const properties = {
  /** */
    disabled(root, value) {
      updateChildrenProperty(root, 'ui-input', 'disabled', value);
      updateChildrenProperty(root, '#remove', 'disabled', value);
      updateChildrenProperty(root, '#append', 'disabled', value);
    }
  }

/** Поле для ввода количества @class {UIInputCount} @extends {Component}
  */
  export default class UIInputCount extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div>
          <ui-button-icon id="remove">remove</ui-button-icon>
          <ui-input><slot></slot></ui-input>
          <ui-button-icon id="append">add</ui-button-icon>
        </div>
      </template>`;

  /** Создание компонента {UIInputCount} @constructor
    * @param {string|object} options название поля ввода либо настройки компонента {label, max, min, step, value}
    */
    constructor(options) {
      super();
      if (!options) return;
      if (typeof options !== 'object') options = {label: options};

      if (options.label) this.innerHTML = options.label;
      ['max', 'min', 'step', 'value'].forEach(e => { if (options[e]) this[e] = options[e] });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIInputCount} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const append = node.querySelector('#append');
      const remove = node.querySelector('#remove');
      const input  = node.querySelector('ui-input');

      append.addEventListener('click', _ => this.value = (parseFloat(this.value) || 0) + (parseFloat(this.step) || 1));
      remove.addEventListener('click', _ => this.value = (parseFloat(this.value) || 0) - (parseFloat(this.step) || 1));
      input.addEventListener('input', _ => this.value = input.value);
      return this;
    }
  }

Component.init(UIInputCount, 'ui-input-count', {attributes, properties});
