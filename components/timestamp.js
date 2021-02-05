import Component, {html, css} from '../script/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  slot {
    display: block;
  }`;

/** Timestamp {UITimestamp} @class @ui @component <ui-timestamp />
  * Отображение даты и времени
  */
  export default class UITimestamp extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UITimestamp} @constructor
    * @param {type} store type
    */
    constructor(store) {
      super();
      this.store({store});
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UITimestamp} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const {store} = this.store();
      return this;
    }


  }

Component.init(UITimestamp, 'ui-timestamp', {attributes, properties});
