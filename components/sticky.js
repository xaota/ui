import Component, {html, css} from '../script/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
    position: sticky;

    top: 0;
  }

  slot {
    display: block;
  }`;

/** Sticky {UISticky} @class @ui @component <ui-sticky />
  * Элемент липучка
  */
  export default class UISticky extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  #observer = null;

  /** Создание компонента {UISticky} @constructor
    */
    constructor() {
      super();
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UISticky} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      console.log(this.parentNode);

      this.#observer = new IntersectionObserver(
        ([sticky], observer) => {
          // e.target.classList.toggle("is-pinned", e.intersectionRatio < 1);
          const targetInfo = sticky.boundingClientRect;
          // const stickyTarget = sticky.target.parentElement.querySelector('.sticky');
          const rootBoundsInfo = sticky.rootBounds;
          console.log({
            targetInfo,
            rootBoundsInfo,
            intersectionRatio: sticky.intersectionRatio
          });
        },
        {
          // root: this.parentNode,
          rootMargin: '10px',
          threshold: [0, 1] // 0
        }
      );

      this.#observer.observe(this);
      return this;
    }

    unmount(node) {
      console.log(node);
      this.#observer.unobserve(this);
      return this;
    }
  }

Component.init(UISticky, 'ui-sticky', {attributes, properties});
