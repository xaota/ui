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

/** Table {UITable} @class @ui @component <ui-table />
  * Компонент для отображения табличных данных
  */
  export default class UITable extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UITable} @constructor
    * @param {type} store type
    */
    constructor(store) {
      super();
      this.store({store});
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UITable} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const {store} = this.store();
      return this;
    }


  }

Component.init(UITable, 'ui-table', {attributes, properties});
