import Component, {html, css} from '../script/Component.js';

const style = css`
  :host {
    --radius: 3px;
    --background: rgba(255, 255, 255, 0.95);

    display: block;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    border: none;
    box-sizing: border-box;
    font-size: 1.1em;
    font-weight: 100;
    outline: none;
    border-radius: var(--radius);
    background: var(--background);
  }
  slot {
    display: block;
    padding: 16px 24px;
    font-family: var(--font);
  }
  :host([thin]) slot {
    padding: 8px 12px;
  }`;

const attributes = {}
const properties = {}

/** {UIPaper} @class
  * @description Отображение блока простого текста
  */
  export default class UIPaper extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIPaper} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIPaper} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIPaper, 'ui-paper', {attributes, properties});
