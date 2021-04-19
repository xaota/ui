import Component, { html, css } from '../script/Component.js';
import { updateChildrenAttribute } from '../script/DOM.js';
// eslint-disable-next-line no-unused-vars
import UINumeric from './numeric.js';

export const CURRENCIES = {
  USD: '&#36;',   // Dollar
  EUR: '&#8364;', // Euro
  GBP: '&#163;',  // Pound sterling
  BTC: '&#8383;', // Bitcoin
  RUB: '&#8381;'  // Ruble
};

const attributes = {
  /** / label */
    label(root, value) {
      const label = value?.toUpperCase() || '';
      const html = (CURRENCIES[label] || label)?.trim() || '';
      let data = html;
      if (html.startsWith('&#') && html.slice(-1) === ';') {
        const temp = document.createElement('span');
        temp.innerHTML = html;
        data = temp.textContent;
      };
      updateChildrenAttribute(root, 'ui-numeric', 'label', data);
    },
  /** / precision */
    precision(root, value) { updateChildrenAttribute(root, 'ui-numeric', 'precision', value) }
};
const properties = {};

const style = css`
  :host {
    display: inline
  }`;

/** NumericAmount {UINumericAmount} @class @ui @component <ui-numeric-amount />
  * Отображает числовое значение
  */
  export default class UINumericAmount extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-numeric><slot></slot></ui-numeric>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UINumericAmount} @this текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UINumericAmount, 'ui-numeric-amount', { attributes, properties });
