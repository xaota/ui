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

/** Timeline {UITimeline} @class @ui @component <ui-timeline />
  * Временная шкала
  */
  export default class UITimeline extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UITimeline} @constructor
    // * @param {}
    */
    constructor() {
      super();
      // this.store({});
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UITimeline} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      // const {} = this.store();
      return this;
    }
  }

Component.init(UITimeline, 'ui-timeline', { attributes, properties });
