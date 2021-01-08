import Component, {html, css} from '../script/Component.js';
import {updateChildrenText} from '../script/DOM.js';

const style = css`
  :host {
    display: block;
    border: none;
    padding-bottom: 0.5em;
  }
  :host([fold]) {
    padding-bottom: 0;
  }
  header {
    display: block;
    background: var(--background-dark);
    font: var(--font);
    cursor: pointer;
    padding: 0.25em;
    padding-left: 1.5em;
    font-weight: 400;
    transition: 0.3s ease background-color;
  }
  :host([fold]) header {
    margin: 0;
    text-decoration: none;
  }
  header:hover {
    background: var(--background-light);
  }
  slot {
    display: block;
    border-right: 2px solid var(--background-dark);
    margin-right: 0.5em;
    padding: 0.5em;
    padding-bottom: 0;
  }
  :host([fold]) slot {
    display: none;
    padding: 0;
  }
  ::slotted(a) {
    text-decoration: none;
    color: var(--color-primary-dark);
    font-family: var(--font);
  }

  ::slotted(a:hover) {
    color: black;
    /* border-bottom: 1px dashed var(--color-primary-light); */
  }`;

const attributes = {
  caption(root, value) { updateChildrenText(root, 'header', value) }
}
const properties = {
  fold() {}
}

/** {UIFieldset} @class
  * @description Отображение блока для группы элементов
  */
  export default class UIFieldset extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <header></header>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIFieldset} @constructor
    * @param {string?} caption заголовок группы
    */
    constructor(caption) {
      super();
      if (caption) this.caption = caption;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIFieldset} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const header = node.querySelector('header');
      header.addEventListener('click', _ => this.fold = !this.fold);

      return this;
    }
  }

Component.init(UIFieldset, 'ui-fieldset', {attributes, properties});
