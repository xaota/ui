import Component, { html, css } from '../script/Component.js';
import $, { updateChildrenText, slottedValue } from '../script/DOM.js';

const attributes = {
/** / label */
  label(root, value) { updateChildrenText(root, '#label', value); },
/** / precision */
  precision(root) { this.render(root); }

// no-zero
// sup, sub
// decimal
// thousand
// trunc / round / ceil / floor
};
const properties = {};

const style = css`
  :host {
    display: inline;
  }
  slot {
    display: none;
  }
  #label {
    margin-left: 4px;
  }`;

/** Numeric {UINumeric} @class @ui @component <ui-numeric />
  * Отображает числовое значение (+ возможно с подписью)
  */
  export default class UINumeric extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <span id="value"></span>
        <span id="label"></span>
      </template>`;

  /** Создание компонента {UINumeric} @constructor
    * @param {number} value устанавливаемое значение
    */
    constructor(value) {
      super();
      if (value === undefined) return;
      this.innerText = value;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UINumeric} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      /** @type {HTMLSlotElement} */
      const slot = $('slot', node);
      slot.addEventListener('slotchange', () => this.render(node));
      return this;
    }

  /** / render */
    render(node) {
      /** @type {HTMLSlotElement} */
      const slot = $('slot', node);
      /** @type {HTMLSpanElement} */
      const value = $('#value', node);
      if (!slot || !value) return;
      const precision = Number.parseInt(this.precision);

      const text = slottedValue(slot);
      const data = numeric(text, Number.isNaN(precision) ? undefined : precision);
      value.innerText = data;
    }
  }

Component.init(UINumeric, 'ui-numeric', { attributes, properties });

/** форматирование числа / numeric @export
 * @param {string | number} value значение
 * @param {number} [precision=2] точность (знаков после запятой)
 * @param {string} [thousand=' '] разделитель разрядов
 * @param {string} [decimal=','] разделитель дробной части
 * @return {string} форматированное число
 */
  export function numeric(value, precision = 2, thousand = '.', decimal = ',') {
    /** @type {number} */
    const data = Number.parseFloat(value);
    if (Number.isNaN(data)) return '';

    /** @type {string} */
    const integerReverse = Math.trunc(precision > 0 ? data : Math.round(data)).toString().split('').reverse().join('');

    /** @type {string} */
    const integer = [...(integerReverse.matchAll(/\d{1,3}/g))]
      .map(e => e[0].split('').reverse().join(''))
      .reverse()
      .join(thousand);

    const fraction = precision > 0 ? Math.round(data * Math.pow(10, precision)).toString().slice(-precision) : '';

    return precision > 0 ? integer + decimal + fraction : integer;
  }
