import Component, { html, css } from '../script/Component.js';
import $, { updateChildrenText, updateChildrenAttribute, slottedValue } from '../script/DOM.js';
// import UIIcon from './icon.js';
// @TODO: Добавить иконку у ссылки

const attributes = {
  /** */
    href(root, value) {
      updateChildrenAttribute(root, 'a', 'href', value);
    }
  };

const properties = {
  /** */
    selected(root, value) {},

  /** / blank */
    blank(root, value) {
      updateChildrenAttribute(root, 'a', 'target', value ? '_blank' : '_self');
    },

  /** */
    disabled(root, value) {
      // ...
    }
  };

const style = css`
  :host {
    display: inline-block;
    --link-border-style: solid;
  }
  :host([blank]) {
    --link-border-style: dashed;
  }
  :host-context(ui-navigation) {
    --link-border-style: none !important;
  }
  slot {
    display: none;
  }
  a {
    font: var(--font);
    display: inline-flex;
    color: var(--foreground);
    text-decoration: none;
    height: 100%;
    align-items: center;
  }
  a span {
    display: block;
    /* margin: auto; */
    opacity: 0.8;
    border-bottom-width: 1px;
    border-bottom-color: transparent;
    border-bottom-style: var(--link-border-style);
  }
  :host([blank]) a span {
    border-bottom-color: var(--foreground);
  }
  a:hover span {
    color: var(--foreground);
    border-bottom-color: var(--foreground);
    opacity: 1;
  }`;

/** Link {UILink} Ссылка
  * @class UILink
  * @param {boolean} selected является ли ссылка "выбранной"
  * @component <ui-link />
  * @ui
  */
  export default class UILink extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <!-- <ui-icon></ui-icon> -->
        <a><span></span></a>
      </template>`;

  // /** Создание компонента {UILink} @constructor
  //   * @param {type} store param-description
  //   */
  //   constructor(store) {
  //     super();
  //     this.store({ store });
  //   }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UILink} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      /** @type {HTMLSlotElement} */
      const slot = $('slot', node);
      slot.addEventListener('slotchange', () => {
        const text = slottedValue(slot);
        updateChildrenText(node, 'a span', text);
      });

      return this;
    }
  }

Component.init(UILink, 'ui-link', { attributes, properties });
