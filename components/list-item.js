import Component, { html, css } from '../script/Component.js';
import { drawRipple } from '../script/Material.js';
import { pointerOffset } from '../script/DOM.js';

const style = css`
  :host {
    --duration: .4s;
    --size: 200px;
    --fill-ripple: var(--color-default-light);
    text-align: left;
  }

  :host, slot {
    display: block;
    font-family: var(--font);
  }

  #root {
    position: relative;
  }

  #ripple {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    z-index: -1;
  }

  div.ripple {
    background: var(--fill-ripple);
    position: absolute;
    border-radius: 50%;
    width: 0;
    height: 0;
    transition: var(--duration) all ease-in;
    transform: translate(-50%, -50%);
  }

  div.ripple.run {
    width: var(--size);
    height: var(--size);
    background-color: var(--fill-static);
  }

  slot {
    cursor: pointer;
  }

  :host([selected]) {
    background: rgba(0, 0, 0, 0.03);
  }

  :host(:hover) {
    background: rgba(0, 0, 0, 0.08);
  }

  ::slotted(*) {
    display: block;
    text-decoration: none;
    padding: 16px 24px;
    font-family: var(--font);
  }`;

const attributes = {}
const properties = {}

/** {UIListItem} @class
  * @description Отображение блока простого текста
  */
  export default class UIListItem extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div id="root">
          <div id="ripple"></div>
          <slot></slot>
        </div>
      </template>`;

  /** Создание компонента {UIListItem} @constructor
    * @param {string} value значение атрибута value элемента списка
    * @param {string?} text содержимое элемента
    */
    constructor(value, text = '') {
      super();
      if (value) this.value = value;
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIListItem} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const slot = node.querySelector('slot');
      slot.addEventListener('slotchange', () => {
        const nodes = [...slot.assignedNodes()];
        if (nodes.length === 1 && nodes[0] instanceof Text) {
          const span = document.createElement('span');
          span.textContent = nodes[0].nodeValue;
          nodes[0].parentNode.replaceChild(span, nodes[0]);
        }
      });

      const root = node.querySelector('#root');
      const ripple = root.querySelector('#ripple');
      root.addEventListener('click', event => {
        const position = pointerOffset(root, event);
        drawRipple.call(ripple, position);
      });

      return this;
    }
  }

Component.init(UIListItem, 'ui-list-item', { attributes, properties });
