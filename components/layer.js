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

/** Layer {UILayer} @class @ui @component <ui-layer />
  * Слой
  */
  export default class UILayer extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UILayer} @constructor
    * @param {}
    */
    constructor() {
      super();
      // this.store({});
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UILayer} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      // const {} = this.store();
      return this;
    }
  }

Component.init(UILayer, 'ui-layer', { attributes, properties });
