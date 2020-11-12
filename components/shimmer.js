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

/** Shimmer {UIShimmer} @class @ui @component <ui-shimmer />
  * Мерцалка-загрузчик - компонент, используемый для предпоказа контента в процессе его загрузки
  */
  export default class UIShimmer extends Component {
    static template = html`
      <template>
        <style>${style}</style>
      </template>`;

  /** Создание компонента {UIShimmer} @constructor
    * @param {type} store type
    */
    constructor(store) {
      super();
      this.store({store});
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIShimmer} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const {store} = this.store();
      return this;
    }


  }

Component.init(UIShimmer, 'ui-shimmer', {attributes, properties});
