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

/** Panorama {UIPanorama} @class @ui @component <ui-panorama />
  * 360 градусный обзор
  */
  export default class UIPanorama extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIPanorama} @constructor
    * @param {type} store type
    */
    constructor(store) {
      super();
      this.store({ store });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIPanorama} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const { store } = this.store();
      return this;
    }
  }

Component.init(UIPanorama, 'ui-panorama', { attributes, properties });
