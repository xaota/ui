import Component, {html, css} from '../script/Component.js';

const attributes = {};
const properties = {};

const style = css`
  slot {
    display: inline;
    filter: blur(5px);
    user-select: none;
  }
  :host([block]) slot {
    display: block;
  }
  :host([disabled]) slot {
    filter: none;
    user-select: initial;
  }`;

/** Blur {UIBlur} @class @ui @component <ui-blur />
  * Размытие текстовых или блочных данных
  */
  export default class UIBlur extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIBlur} @constructor
    * @param {type} store type
    */
    constructor(store) {
      super();
      this.store({store});
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIBlur} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const {store} = this.store();
      return this;
    }


  }

Component.init(UIBlur, 'ui-blur', {attributes, properties});
