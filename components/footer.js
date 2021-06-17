import Component, { html, css } from '../script/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
    text-align: center;
  }
  slot {
    display: block;
  }`;

/** Footer {UIFooter} @class @ui @component <ui-footer />
  * Подвал страницы
  */
  export default class UIFooter extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIFooter} @constructor
    * @param {type} store type
    */
    constructor(store) {
      super();
      this.store({ store });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIFooter} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const { store } = this.store();
      return this;
    }
  }

Component.init(UIFooter, 'ui-footer', { attributes, properties });
