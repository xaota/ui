import Component, {html, css} from '../script/Component.js';

const style = css`
  :host {
    display: block;
    font-family: var(--font);
  }`;

const attributes = {}
const properties = {}

/** {UIText} @class
  * @description Отображение блока простого текста
  */
  export default class UICopyright extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        &copy; <slot></slot>
      </template>`;

  /** Создание компонента {UIText} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UICopyright} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UICopyright, 'ui-copyright', {attributes, properties});
