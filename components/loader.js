import Component, {html, css} from '../script/Component.js';
import UIMeter from './meter.js';

const style = css`
  :host {
    display: inline-block;
    --size: 48px;
    --stroke: 4px;
    --angle: 45deg;
    --fill: 40;
    --font-weight: 700;
    --text: '65%';
    --background: transparent;
    --color: var(--color-details);
  }`;

const attributes = {
  // 'min', 'max', 'value', 'mode', 'color', 'background', 'size', 'angle', 'low', 'high', 'optium', 'stroke', 'speed'
}
const properties = {
  // 'disabled', 'linear', 'fill', 'reverse'
}

/** {UILoader} @class
  * @description Отображение блока простого текста
  */
  export default class UILoader extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-meter min="0" max="100" value="100" />
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UILoader} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UILoader, 'ui-loader', {attributes, properties});
