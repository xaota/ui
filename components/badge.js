import Component, {html, css} from '../script/Component.js';
import {updateChildrenText} from '../script/DOM.js';

const style = css`
  :host {
    display: inline-block;
    position: relative;
  }

  span {
    position: absolute;
    top: 0;
    right: 0;
    transform: scale(1) translate(50%, -50%);
    transform-origin: 100% 0%;
    color: rgba(0, 0, 0, 0.87);
    background-color: #f48fb1;
    height: 20px;
    display: flex;
    padding: 0 6px;
    z-index: 1;
    position: absolute;
    flex-wrap: wrap;
    font-size: 0.75rem;
    min-width: 20px;
    box-sizing: border-box;
    transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    align-items: center;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1;
    align-content: center;
    border-radius: 10px;
    flex-direction: row;
    justify-content: center;
  }

  :host([x="left"]) span {
    right: auto;
    left: 0;
    transform: scale(1) translate(-50%, -50%);
  }
  :host([y="bottom"]) span {
    top: auto;
    bottom: 0;
    transform: scale(1) translate(50%, 0);
  }
  :host([x="left"][y="bottom"]) span {
    right: auto;
    left: 0;
    top: auto;
    bottom: 0;
    transform: scale(1) translate(-50%, 0);
  }

  :host([dot]) span {
    height: 8px;
    padding: 0;
    min-width: 8px;
    border-radius: 4px;
    content: '';
    font-size: 0;
    color: transparent;
  }

  :host([count="0"]) span, :host([hidden]) span {
    display: none;
  }

  :host([count="0"][zero]) span {
    display: flex;
  }`;

const attributes = {
  /** / count */
    count(root, value, prev) {
      value = badge(root, value, this.max);
      const current = parseInt(this.count);
      if (isNaN(current) || current < 0) return this.count = value;
      updateChildrenText(root, 'span', value);
    },

  /** / max */
    max(root, value) { updateChildrenText(root, 'span', badge(root, this.count, value)) }
  }
const properties = {}

/** Метка {UIBadge} @class
  * @description Отображение метки и счетчика на элементе
  */
  export default class UIBadge extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <span></span>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIBadge} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIBadge} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIBadge, 'ui-badge', {attributes, properties});

// #region [Private]
/** / badge */
  function badge(root, count = 0, max = 0) {
    count = parseInt(count);
    max   = parseInt(max);
    if (!max || isNaN(max) || max < 1) max = Infinity;
    if (isNaN(count) || count < 0) count = 0;
    return count <= max
      ? count.toString()
      : `${max}+`;
  }
// #endregion
