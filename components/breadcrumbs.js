import Component, { html, css } from '../script/Component.js';

const style = css`
  :host {
    display: block;
  }
  div.root slot {
    display: flex;
  }
  ::slotted(a), ::slotted(span) {
    margin-right: 0.5em;
    text-decoration: none;
  }
  ::slotted(a:not(:last-child))::after, ::slotted(span:not(:last-child))::after {
    content: "→";
    margin-left: 0.5em;
  }`;

const attributes = {}
const properties = {}

/** {UIBreadcrumbs} @class
  * @description Отображение блока простого текста
  */
  export default class UIBreadcrumbs extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div class="root">
          <slot></slot>
        </div>
      </template>`;

  /** Создание компонента {UIBreadcrumbs} @constructor
    * @param {...Node} nodes путь
    */
    constructor(...nodes) {
      super();
      if (nodes.length > 0) nodes.forEach(node => this.append(node));
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIBreadcrumbs} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIBreadcrumbs, 'ui-breadcrumbs', { attributes, properties });
