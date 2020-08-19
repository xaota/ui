import Component, {html, css} from '../script/Component.js';

const style = css`
  :host {
    --duration: 0.2s;

    display: block;
    /* box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12); */
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    border: none;
    box-sizing: border-box;
    font-size: 1.1em;
    font-weight: 100;
    outline: none;
    border-radius: var(--radius);
    background: white;
    z-index: 2;

    transform: scaleY(0);
    transform-origin: top;
    transition: var(--duration) ease transform;
    transition-delay: var(--duration);
  }

  :host-context([y="bottom"]) {
    transform-origin: bottom;
  }

  :host([visible]) {
    /* display: block; */
    transform: scaleY(1);
  }`;

const attributes = {}
const properties = {
  visible() {} // show
}

/** {UIDrop} @class
  * @description Отображение блока простого текста
  */
  export default class UIDrop extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIDrop} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIDrop} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      // this.style.transition = '0.2s ease transform';
      return this;
    }
  }

Component.init(UIDrop, 'ui-drop', {attributes, properties});
