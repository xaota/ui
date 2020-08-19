import Component, {html, css} from '../script/Component.js';
import UIInput       from './input.js';
import UIChip        from './chip.js';
import UIChipTooltip from './chip-tooltip.js';
import {updateChildrenText, updateChildrenAttribute, updateChildrenProperty, cssVariable} from '../script/DOM.js';

const style = css`
  :host {
    display: inline-block;
    position: relative;
  }

  ui-input {
    display: block;
    width: 100%;
  }

  slot {
    display: block;
    position: absolute;
    left: 0;
    /* top: 0; */
    bottom: 0.4em;
    white-space: nowrap;
  }`;

const attributes = {
  /** */
    label(root, value) { updateChildrenText(root, 'ui-input', value) },
  /** */
    value(root, value) { updateChildrenAttribute(root, 'ui-input', 'value', value) },
  /** */
    placeholder(root, value) { updateChildrenAttribute(root, 'ui-input', 'placeholder', value) },
  /** */
    icon(root, value) { updateChildrenAttribute(root, 'ui-input', 'icon', value) }
  }
const properties = {
  /** */
    disabled(root, value) {updateChildrenProperty(root, 'ui-input', 'disabled', value)}
  }

/** Поле ввода списка тегов @class {UIInputChips} @extends {Component}
  */
  export default class UIInputChips extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div class="root">
          <ui-input></ui-input>
          <slot></slot>
        </div>
      </template>`;

  /** Создание компонента {UIInputChips} @constructor
    * @param {string?} label название поля
    */
    constructor(label) {
      super();
      if (label) this.label = label;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIInputChips} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const input = node.querySelector('ui-input');
      const slot  = node.querySelector('slot');
      this.addEventListener('focus',      _ => input.dispatchEvent(new FocusEvent('focus')));
      input.addEventListener('enter',     _ => calculateValue.call(this, input));
      input.addEventListener('change',    _ => calculateValue.call(this, input));
      slot.addEventListener('slotchange', _ => setTimeout(_ => calculateChips.call(this, input, slot), 100));
      return this;
    }

  /** */
    append(content, params = {}) {
      const chip = params.tooltip
        ? new UIChipTooltip(content, params.tooltip, 'clear')
        : new UIChip(content, 'clear');
      if (params.value) chip.value = params.value;
      chip.addEventListener('action', _ => chip.remove());
      this.appendChild(chip);
      this.event('change');
      return this;
    }
  }

Component.init(UIInputChips, 'ui-input-chips', {attributes, properties});

// #region [Private]
/** / calculateValue*/
  function calculateValue(input) {
    const value = (input.value || '').trim();
    if (!value) return;
    input.value = ``;
    this.append(value);
  }

/** / calculateChips */
  function calculateChips(input, chips) {
    const width = Math.ceil(chips.getBoundingClientRect().width);
    cssVariable(input, 'padding-left', width + 'px');
  }
// #endregion
