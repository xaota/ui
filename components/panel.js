import Component, {html, css} from '../script/Component.js';

const style = css`
  :host {
    --radius: 3px;

    display: block;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    border: none;
    box-sizing: border-box;
    /* font-size: 1.1em; */
    font-weight: 100;
    outline: none;
    border-radius: var(--radius);
    background: var(--background-panel);
  }

  div.root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  slot {
    display: block;
    width: 100%;
    font-family: var(--font);
  }

  slot[name="top"] {
    margin-bottom: auto;
    margin-top: 1em;
  }

  slot[name="bottom"] {
    margin-top: auto;
    margin-bottom: 1em;
  }

  ::slotted(*) {
    /*
    font-size: 18px;
    */
    margin: .5em .3em;
    text-decoration: none;
    font-family: var(--font);
    display: block;
    color: var(--color-primary-dark);
  }

  @media screen and (prefers-color-scheme: dark) {
    ::slotted(*) {
      color: var(--color-primary-light);
    }
  }

  ::slotted(*:hover) {
    color: var(--foreground);
    /* border-bottom: 1px dashed var(--color-primary-light); */
  }`;

const attributes = {}
const properties = {}

/** {UIPanel} @class
  * @description Отображение блока простого текста
  */
  export default class UIPanel extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div class="root">
          <slot name="top"></slot>
          <slot></slot>
          <slot name="bottom"></slot>
        </div>
      </template>`;

  /** Создание компонента {UIPanel} @constructor
    */
    // constructor() {
    //   super();
    // }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIPanel} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIPanel, 'ui-panel', {attributes, properties});
