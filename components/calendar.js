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

/** Calendar {UICalendar} @class @ui @component <ui-calendar />
  * Календарь
  */
  export default class UICalendar extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UICalendar} @constructor
    * @param {type} store type
    */
    constructor(store) {
      super();
      this.store({ store });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UICalendar} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const { store } = this.store();
      return this;
    }
  }

Component.init(UICalendar, 'ui-calendar', { attributes, properties });
