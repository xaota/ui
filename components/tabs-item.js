import Component, { html, css } from '../script/Component.js';

const style = css`
  :host {
    display: block;
    height: 100%;
    font-family: var(--font);
    padding: 0;
    margin: 0;
  }
  slot {
    display: block;
    padding: 0;
    margin: 0;
  }`;

const attributes = {
  /** */
    name() {},

  /** */
    caption() {}
  }

const properties = {
  /** */
    selected() {}
  }

/** {UITabsItem} @class
  * @description Отображение блока простого текста
  * @todo: onSelect event
  */
  export default class UITabsItem extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UITabsItem} @constructor
    * @param {string?} caption название вкладки в UI
    * @param {string?} name название вкладки (для js)
    */
    constructor(caption = '', name = caption) {
      super();
      if (name)    this.name = name;
      if (caption) this.caption = caption;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UITabsItem} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UITabsItem, 'ui-tabs-item', { attributes, properties });
