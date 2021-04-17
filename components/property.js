import Component, { html, css } from '../script/Component.js';
import { updateChildrenAttribute, updateChildrenText } from '../script/DOM.js';
import UIIcon from './icon.js';
import UITooltip from './tooltip.js';

const attributes = {
  caption(root, value) { updateChildrenText(root, '#caption', value) },
  addition(root, value) { updateChildrenText(root, '#addition', value) },
  description(root, value) { updateChildrenText(root, '#description', value) },
  info(root, value) { updateChildrenAttribute(root, 'ui-tooltip', 'content', value) }
}
const properties = {}

const style = css`
  :host {
    display: block;
    --caption: var(--property-caption, 20%);
  }
  div {
    display: grid;
    grid-template-areas: 'caption content' 'addition description';
    grid-template-columns: var(--caption) auto;
    gap: 0.5em;
  }
  #caption {
    grid-area: caption;
    align-self: end;
  }
  #addition { grid-area: addition; }
  #description { grid-area: description; }
  #content {
    grid-area: content;
    align-self: end;
  }
  ui-tooltip {
    margin-left: 1em;
    position: relative;
    top: 6px;
  }
  ui-tooltip:not([content]) { display: none }
  ui-icon {
    --icon-static: var(--primary);
    width: 1em;
  }
  #addition, #description {
    color: gray;
    font: var(--font);
    font-size: 0.8em;
  }
  `;

/** Property {UIProperty} @class @ui @component <ui-property />
  * Компонент для описания свойства и значения
  */
  export default class UIProperty extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div>
          <ui-text id="caption"></ui-text>
          <ui-text id="addition"></ui-text>
          <ui-text id="content">
            <slot></slot>
            <ui-tooltip><ui-icon>info-outline</ui-icon></ui-tooltip>
          </ui-text>
          <ui-text id="description"></ui-text>
        </div>
      </template>`;

  // /** Создание компонента {UIProperty} @constructor
  //   */
  //   constructor(store) {
  //     super();
  //   }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIProperty} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      // const {store} = this.store();
      return this;
    }
  }

Component.init(UIProperty, 'ui-property', { attributes, properties });
