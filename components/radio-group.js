import Component, {html, css} from '../script/Component.js';
import UIRadio from './radio.js';

const style = css`
  :host {
    display: inline-block;
  }

  slot {
    display: block;
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

  input[type="checkbox"]:checked ~ label {
    border-color: #6fbeb5;
    /* box-shadow: inset 0 0 0 1px #898989; */
  }

  input[type="checkbox"] ~ label:after {
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

  input[type="checkbox"]:checked ~ label:after {
    opacity: 1;
    margin: 2px;
    height: 16px;
    width: 16px;
  }`;

const attributes = {
  /** */
    value(root, value) { setValue.call(this, root, value) }
  }
const properties = {}

/** {UIRadioGroup} @class
  * @description Отображение блока простого текста
  */
  export default class UIRadioGroup extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIRadioGroup} @constructor
    * @param {string?} value значение элемента
    */
    constructor(value) {
      super();
      if (value) this.value = value;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIRadioGroup} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const listeners = [];
      const slot = node.querySelector('slot');
      slot.addEventListener('slotchange', () => {
        const nodes = [...slot.assignedElements()];
        const items = nodes.filter(item => UIRadio.is(item));

        const listener = e => {
          const checked = e.target.checked;
          if (!checked) return;
          const value = e.target.value;
          if (value !== undefined && this.value !== value) return this.value = value;
          change(items, e.target);
          this.event('change', {value: e.target.value});
        };

        items.forEach(item => {
          listeners.forEach(listener => item.removeEventListener('change', listener));
          item.addEventListener('change', listener);
        });

        listeners.push(listener);
      });
      return this;
    }
  }

Component.init(UIRadioGroup, 'ui-radio-group', {attributes, properties});

// #region [Private]
/** / change */
  function change(items, target) {
    const temp = items.filter(item => item !== target && item.checked);
    temp.forEach(item => item.checked = false);
  }

/** / setValue */
  function setValue(root, value) {
    const slot = root.querySelector('slot');
    const items = [...slot.assignedElements()]
      .filter(item => UIRadio.is(item));
    const target = items.find(e => e.value == value);
    if (!target) return;

    target.checked = true;
    change(items, target);
    this.event('change', {value});
  }
// #endregion
