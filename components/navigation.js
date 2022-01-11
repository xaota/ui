import Component, { html, css } from '../script/Component.js';
import $, { updateChildrenProperty } from '../script/DOM.js';
import UILink from './link.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  slot {
    display: block;
    height: 100%;
    font-size: 18px;
  }
  ::slotted(ui-link) {
    height: 100%;
    vertical-align: center;
    margin-right: 12px;
  }
  ::slotted(ui-link[selected]) {
    border-bottom: 2px solid var(--color-edge);
  }`;

/** Navigation {UINavigation} @class @ui @component <ui-navigation />
  * Панель навигации
  */
  export default class UINavigation extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UINavigation} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      /** @type {HTMLSlotElement} */
      const slot = $('slot', node);
      node.addEventListener('click', e => {
        const path = e.composedPath();
        const link = path.findIndex(c => UILink.is(c));
        const root = path.findIndex(c => UINavigation.is(c));
        if (link < 0 || link > root) return;
        /** @type {UILink} */
        const item = path[link];
        /** @type {Array<UILink>} */
        const items = slot
          .assignedNodes()
          .filter(c => UILink.is(c));
        items.forEach(c => { c.selected = false });
        item.selected = true;
      })
      // slot.addEventListener('slotchange', () => {

      // });
      return this;
    }
  }

Component.init(UINavigation, 'ui-navigation', { attributes, properties });
