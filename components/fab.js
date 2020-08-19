import Component, {html, css} from '../script/Component.js';
import UIIcon from './icon.js';

const style = css`
  :host {
    display: inline-block;
  }
  button {
    -webkit-font-smoothing: antialiased;
    border: 0;
    cursor: pointer;
    margin: 0;
    display: inline-flex;
    outline: 0;
    align-items: center;
    user-select: none;
    vertical-align: middle;
    justify-content: center;
    text-decoration: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    width: 56px;
    height: 56px;
    padding: 0;
    font-size: 0.875rem;
    min-width: 0;
    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12);
    box-sizing: border-box;
    min-height: 36px;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.75;
    border-radius: 50%;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.87);
    background-color: var(--color-alert);
    /* background-color: #90caf9; */
    /* right: 16px; */
    /* bottom: 16px;
    position: absolute; */
    transform: none;
    transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 195ms;
  }`;

const attributes = {}
const properties = {}

/** Floating Action Button (FAB) @class {UIFAB}
  * @description Кнопка, предназначенная для целевого действия на экране приложения
  */
  export default class UIFAB extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <button><ui-icon><slot></slot></ui-icon></button>
      </template>`;

  /** Создание компонента {UIFAB} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIFAB} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIFAB, 'ui-fab', {attributes, properties});
