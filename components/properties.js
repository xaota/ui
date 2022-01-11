import Component, { html, css } from '../script/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  slot {
    display: block;
  }
  ::slotted(ui-property:not(:last-of-type)) {
    margin-bottom: 1.6em;
  }`;

/** Properties {UIProperties} @class @ui @component <ui-properties />
  * Список свойств и их значений
  * @deprecated?
  */
  export default class UIProperties extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIProperties} @constructor
    */
    constructor() {
      super();
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIProperties} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      return this;
    }
  }

Component.init(UIProperties, 'ui-properties', { attributes, properties });
