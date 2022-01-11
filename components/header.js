import Component, { html, css } from '../script/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: flex;
    height: 72px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 50%);
    padding: 0 24px;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    background: var(--background);
  }
  slot:not(:empty) {
    display: block;
  }
  slot[name="navigation"]::slotted(ui-navigation) {
    height: 100%;
  }`;

/** Header {UIHeader} @class @ui @component <ui-header />
  * Шапка страницы
  */
  export default class UIHeader extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot name="logo"></slot>
        <slot></slot>
        <slot name="navigation"></slot>
        <slot name="profile"></slot>
      </template>`;

  // /** Создание компонента {UIHeader} @constructor
  //   * @param {type} store type
  //   */
  //   constructor(store) {
  //     super();
  //     this.store({ store });
  //   }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIHeader} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      // const { store } = this.store();
      return this;
    }
  }

Component.init(UIHeader, 'ui-header', { attributes, properties });
