import Component, { html, css } from '../script/Component.js';
import { updateChildrenText } from '../script/DOM.js';
import UIIcon from './icon.js';

const attributes = {
  icon(root, value) { updateChildrenText(root, 'ui-icon', value) }
};
const properties = {};

const style = css`
  :host {
    display: block;
    border: 2px solid var(--color-edge);
    border-radius: var(--radius, 4px);
    padding: 0.4em;
    cursor: pointer;
    position: relative;
  }
  :host(:hover) {
    border-color: var(--color-edge-accent);
  }
  slot {
    display: block;
    height: 100%;
    text-align: center;
  }
  ui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    opacity: 0.3;
  }
  :host(:hover) ui-icon {
    transform: translate(-50%, -50%) scale(1.1);
  }`;

/** Элемент витрины {UIShowCase} @class @ui @component <ui-showcase-item />
  * Элемент для показа на витрине
  */
  export default class UIShowCase extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <ui-icon></ui-icon>
      </template>`;

  /** Создание компонента {UIShowCase} @constructor
    */
    constructor() {
      super();
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIShowCase} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      return this;
    }
  }

Component.init(UIShowCase, 'ui-showcase-item', { attributes, properties });
