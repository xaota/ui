import Component, { html, css } from '../script/Component.js';
import { updateChildrenAttribute, updateChildrenProperty } from '../script/DOM.js';
import UIChip    from './chip.js';
import UITooltip from './tooltip.js';

const style = css`
  :host, slot {
    display: inline-block;
  }`;

const attributes = {
  /** */
  action(root, value) { updateChildrenAttribute(root, 'ui-chip', 'action', value) },
  /** */
    value(root, value) { updateChildrenAttribute(root, 'ui-chip', 'value', value) },
  /** */
    content(root, value) { updateChildrenAttribute(root, 'ui-tooltip', 'content', value) },
  /** */
    x(root, value) { updateChildrenAttribute(root, 'ui-tooltip', 'x', value) },
  /** */
    y(root, value) { updateChildrenAttribute(root, 'ui-tooltip', 'y', value) }
  }
const properties = {
  /** */
    outline(root, value) { updateChildrenProperty(root, 'ui-chip', 'outline', value) }
  }

/** Фишка с подсказкой {UIChipTooltip} @class
  */
  export default class UIChipTooltip extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-tooltip>
          <ui-chip>
            <slot name="avatar" slot="avatar"></slot>
            <slot></slot>
          </ui-chip>
        </ui-tooltip>
      </template>`;

  /** Создание компонента {UIChipTooltip} @constructor
    * @param {string} text текст на фишке
    * @param {string} content текст подсказки на фишке
    * @param {string} action иконка действия
    */
    constructor(text, content, action) {
      super();
      if (text)    this.innerText = text;
      if (content) this.content = content;
      if (action)  this.action = action;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIChipTooltip} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIChipTooltip, 'ui-chip-tooltip', { attributes, properties });
