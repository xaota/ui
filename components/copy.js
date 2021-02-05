import Component, {html, css} from '../script/Component.js';
import $ from '../script/DOM.js';

const attributes = {
  value(root, value) {}
};
const properties = {};

const style = css`
  :host {
    display: inline-block;
  }
  slot {
    display: block;
  }`;

/** Copy {UICopy} @class @ui @component <ui-copy />
  * Копирование текста в буфер обмена (@require https)
  */
  export default class UICopy extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  // /** Создание компонента {UICopy} @constructor
  //   * @param {type} store type
  //   */
  //   constructor(store) {
  //     super();
  //     this.store({store});
  //   }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UICopy} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const slot = $('slot', node);
      slot.addEventListener('click', () => {
        if (!this.value) return;

        navigator.clipboard
          .writeText(this.value)
          .then(() => {
            console.log('copied!');
            this.event('copy', {value: this.value, success: true});
          })
          .catch(() => {
            console.error('copy error!');
            this.event('copy', {value: this.value, success: false});
          });
      });

      // const {store} = this.store();
      return this;
    }


  }

Component.init(UICopy, 'ui-copy', {attributes, properties});
