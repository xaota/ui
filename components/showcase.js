import Component, { html, css } from '../script/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
    padding: var(--padding-showcase, 1rem);
  }
  slot {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
    flex-wrap: wrap;
    gap: var(--padding-showcase, 1rem);
  }
  :host([align="left"]) slot {
    justify-content: left;
  }`;

/** Витрина {Showcase} @class @ui @component <ui-showcase />
  * Список элементов для общего показа
  */
  export default class Showcase extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {Showcase} @constructor
    */
    constructor() {
      super();
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Showcase} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      return this;
    }
  }

Component.init(Showcase, 'ui-showcase', { attributes, properties });
