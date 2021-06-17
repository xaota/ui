import Component, { html, css } from '../script/Component.js';
import { updateChildrenAttribute } from '../script/DOM.js';
/* eslint-disable no-unused-vars */
import UIFAB from './fab.js';
import UITooltip from './tooltip.js';
/* eslint-enable no-unused-vars */

  const attributes = {
  /** */
    content(root, value) { updateChildrenAttribute(root, 'ui-tooltip', 'content', value) },
  /** */
    x(root, value) { updateChildrenAttribute(root, 'ui-tooltip', 'x', value) },
  /** */
    y(root, value) { updateChildrenAttribute(root, 'ui-tooltip', 'y', value) }
  }

  const properties = {
  /** */
    disabled(root, value) { updateChildrenAttribute(root, 'ui-button', 'disabled', value) }
  }

const style = css`
  :host {
    display: block;
  }
  slot {
    display: block;
  }`;

/** FABTooltip {UIFABTooltip} @class @ui @component <ui-fb-tooltip />
  * Floating Action Button with tooltip
  */
  export default class UIFABTooltip extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-tooltip><ui-fab><slot></slot></ui-fab></ui-tooltip>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIFABTooltip} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      return this;
    }
  }

Component.init(UIFABTooltip, 'ui-fab-tooltip', { attributes, properties });
