import Component, {html, css} from '../script/Component.js';
import UIRadio from './radio.js';

const style = css`
  :host {
    display: inline-block;
    vertical-align: middle;
  }

  slot {
    display: block;
  }

  :host([vertical]) ::slotted(ui-radio) {
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

    #mutationObserver = null;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIRadioGroup} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      this.#mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          const radio = mutation.target;
          const conditions = [
            mutation.type === "attributes",
            mutation.attributeName === 'checked',
            UIRadio.is(radio)
          ];

          if (conditions.some(c => c !== true)) return;
          if (!radio.checked) return; // @TODO: radio.exclude from ui-radio-group array<string>

          [...this.querySelectorAll('ui-radio')]
            .filter(r => r !== radio)
            .forEach(r => r.checked = false);

          this.event('change', { value: radio.value });
        });
      });

      this.#mutationObserver.observe(this, {
        attributes: true,
        attributeFilter: ['checked'],
        subtree: true
      });

      return this;
    }

    unmount() {
      this.#mutationObserver.disconnect();
      return this;
    }
  }

Component.init(UIRadioGroup, 'ui-radio-group', {attributes, properties});

// #region [Private]
/** / setValue */
  function setValue(root, value) {
    const slot = root.querySelector('slot');
    const items = [...slot.assignedElements()]
      .filter(item => UIRadio.is(item));
    const target = items.find(e => e.value == value);
    if (!target) return;

    target.checked = true;
  }
// #endregion
