import Component, { html, css } from '../script/Component.js';
import { cssVariable } from '../script/DOM.js';

const attributes = {
  length(root, value) { cssVariable(root.querySelector('div'), 'length', value) },
  angle(root, value) { cssVariable(root.querySelector('div'), 'angle', value) },
  direction(root, value) {}, // none, forward?, backward, both
  width(root, value) { cssVariable(root.querySelector('div'), 'width', value) },
  size(root, value) { cssVariable(root.querySelector('div'), 'size', value) }
};
const properties = {};

const style = css`
  :host {
    display: grid;
    --color: var(--color-primary);
    position: relative;
  }
  div {
    margin: auto;
    height: var(--length, 80px);
    width: var(--width, 1px);
    background-color: var(--color);
    transform: rotate(var(--angle, 0));
    --size: 8px;
    position: relative;
  }
  div:before, div:after {
    content: '';
    display: block;
    position: absolute;
    border: var(--size) solid transparent;
    position: absolute;
    left: calc(var(--size) * -1);
    transform: translateX(calc(var(--width) / 2));
  }
  :host([direction="backward"]) div:before, :host([direction="both"]) div:before {
    border-top-width: 0;
    border-bottom-color: var(--color);
    top: calc(var(--size) * -1);
  }
  :host(:not([direction])) div:after, :host([direction="forward"]) div:after, :host([direction="both"]) div:after {
    border-bottom-width: 0;
    border-top-color: var(--color);
    bottom: calc(var(--size) * -1);
  }
  slot {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }`;

/** Arrow {UIArrow} @class @ui @component <ui-arrow />
  * Стрелка
  */
  export default class UIArrow extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div></div>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIArrow} @constructor
    * @param {}
    */
    constructor() {
      super();
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIArrow} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      return this;
    }
  }

Component.init(UIArrow, 'ui-arrow', { attributes, properties });
