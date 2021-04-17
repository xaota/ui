import Component, { html, css } from '../script/Component.js';
import SVG from '../asset/icons.svg.js';
import { clear, slottedValue } from '../script/DOM.js';

const style = css`
  :host {
    display: inline-block;
    width: 24px;
    height: 24px;
    color: var(--icon-static, black);
  }
  :host(:hover) {
    color: var(--icon-hover, black);
  }
  slot {
    display: none;
  }
  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
  svg path {
    fill: currentColor;
  }`;

const attributes = {}
const properties = {}

/** {UIIcon} @class
  * @description Отображение иконки
  */
  export default class UIIcon extends Component {
    static template = html`
    <template>
      <style>${style}</style>
      <slot></slot>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"></svg>
    </template>`;

  /** Создание компонента {UIIcon} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIIcon} @this
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const template = templateSVG(document.head, 'xaota-ui-template-svg-icons');
      const slot = node.querySelector('slot');
      const svg  = node.querySelector('svg');

      slot.addEventListener('slotchange', () => {
        const name = slottedValue(slot);
        if (!name) return clear(svg);

        const id = '#' + name;
        const g = template.querySelector(id);
        const viewBox = g.getAttribute('viewBox');
        const current = svg.getAttribute('viewBox');
        if ((viewBox && current !== viewBox) || (!viewBox && current !== '0 0 24 24')) svg.setAttribute('viewBox', viewBox || '0 0 24 24');
        svg.innerHTML = g.innerHTML;
      });

      return this;
    }
  }

Component.init(UIIcon, 'ui-icon', { attributes, properties });

// #region [Private]
/** / templateSVG */
  function templateSVG(root, id) {
    const template = root.querySelector('#' + id);
    if (template) return template;

    const fragment = document.createElement('template');
    fragment.innerHTML = SVG.trim();
    const svg = fragment.content.firstChild;
    svg.id = id;
    root.appendChild(svg);
    return svg;
  }
// #endregion
