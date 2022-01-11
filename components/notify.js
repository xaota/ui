import Component, { html, css } from '../script/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  slot {
    display: block;
  }`;

/** Notify {UINotify} @class @ui @component <ui-notify />
  * Уведомление
  */
  export default class UINotify extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UINotify} @constructor
    * @param {type} store type
    */
    constructor(store) {
      super();
      this.store({ store });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UINotify} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const { store } = this.store();
      return this;
    }
  }

Component.init(UINotify, 'ui-notify', { attributes, properties });
