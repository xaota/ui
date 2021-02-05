import Component, {html, css} from '../script/Component.js';
import $, {updateChildrenAttribute} from '../script/DOM.js';
import UIIcon from './icon.js';

const attributes = {
  // value(root, value) { updateChildrenAttribute(root, 'ui-copy', 'value', value) }
};
const properties = {};

const style = css`
  :host {
    /* display: inline-block; */
  }
  ui-icon {
    cursor: pointer;
  }
  slot {
    display: none;
  }`;

/** CopyIcon {UICopyIcon} @class @ui @component <ui-copy-icon />
  * Копирование контента по клику на иконке (@require https)
  */
  export default class UICopyIcon extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-copy><ui-icon>copy</ui-icon></ui-copy>
        <slot></slot>
      </template>`;

  /** Создание компонента {UICopyIcon} @constructor
    * @param {string?} value копируемый текст
    */
    constructor(value) {
      super();
      if (value) this.value = value;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UICopyIcon} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const slot = $('slot', node);
      slot.addEventListener('slotchange', e => {
        const value = this.textContent;
        updateChildrenAttribute(node, 'ui-copy', 'value', value);
      });

      const copy = $('ui-copy', node);
      copy.addEventListener('copy', e => {
        this.event('copy', e.detail);
      });

      return this;
    }


  }

Component.init(UICopyIcon, 'ui-copy-icon', {attributes, properties});
