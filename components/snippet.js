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

/** Snippet {UISnippet} @class @ui @component <ui-snippet />
  * Блок с информацией в карточном виде
  */
  export default class UISnippet extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UISnippet} @constructor
    * @param {type} store type
    */
    constructor(store) {
      super();
      this.store({store});
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UISnippet} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const {store} = this.store();
      return this;
    }


  }

Component.init(UISnippet, 'ui-snippet', {attributes, properties});
