import Component, { html, css } from '../script/Component.js';
// eslint-disable-next-line no-unused-vars
import UINumeric from './numeric.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: inline
  }`;

/** NumericPercent {UINumericPercent} @class @ui @component <ui-numeric-percent />
  * Отображает числовое значение
  */
  export default class UINumericPercent extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-numeric label="%"><slot></slot></ui-numeric>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UINumericPercent} @this текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UINumericPercent, 'ui-numeric-percent', { attributes, properties });
