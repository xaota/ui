import Component, {html, css} from '../script/Component.js';
import SVG from '../asset/icons.svg.js';

const style = css`
  :host {
    display: inline-block;
    width: 24px;
    height: 24px;
    color: var(--iconStatic, black);
  }
  :host(:hover) {
    color: var(--iconHover, black);
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
      ${SVG}
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

      const slot = node.querySelector('slot');
      const svg  = node.querySelector('svg');
      const icon = node.querySelector('use');

      slot.addEventListener('slotchange', _ => {
        const self = slot.assignedNodes()[0];
        const value = self instanceof HTMLSlotElement
          ? self.assignedNodes()[0].nodeValue
          : self && self.nodeValue;
        if (!value) return;
        const name = value.trim();
        if (!name) return icon.removeAttributeNS('http://www.w3.org/1999/xlink', 'href');
        const id = '#' + name;
        icon.setAttributeNS('http://www.w3.org/1999/xlink', 'href', id);
        const g = svg.querySelector(id);
        const viewBox = g.getAttribute('viewBox');
        const current = svg.getAttribute('viewBox');
        if (viewBox && current !== viewBox || !viewBox && current !== '0 0 24 24') svg.setAttribute('viewBox', viewBox || '0 0 24 24');
      });

      return this;
    }
  }

Component.init(UIIcon, 'ui-icon', {attributes, properties});
