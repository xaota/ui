import Component, { html, css } from '../script/Component.js';

const style = css`
  :host {
    --radius: 3px;
    --panel-background: var(--background-panel);
    --panel-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    --panel-margin: 1em;
  }
  :host([outline="text"]) {
    --panel-margin: 0;
  }
  :host {
    display: block;
    box-shadow: var(--panel-shadow);
    border: none;
    box-sizing: border-box;
    /* font-size: 1.1em; */
    font-weight: 100;
    outline: none;
    border-radius: var(--radius);
    background: var(--panel-background);
    text-align: left;
  }
  :host([outline="text"]) {
    background: none;
    box-shadow: none;
  }
  :host([outline="text"][active]:hover) {
    outline: 1px solid var(--color-edge);
  }

  :host([center]) {
    text-align: center;
  }
  :host([right]) {
    text-align: right;
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
    margin-top: var(--panel-margin);
  }

  slot[name="bottom"] {
    margin-top: auto;
    margin-bottom: var(--panel-margin);
  }

  ::slotted(*) {
    /*
    font-size: 18px;
    */
    margin: 1em .3em;
    text-decoration: none;
    font-family: var(--font);
    display: block;
    color: var(--color-primary-dark);
  }

  ::slotted(*:first-child) {
    margin-top: 0;
  }

  ::slotted(*:last-child) {
    margin-bottom: 0;
  }

  ::slotted(ui-fieldset) {
    margin: 0 .3em;
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

Component.init(UIPanel, 'ui-panel', { attributes, properties });
