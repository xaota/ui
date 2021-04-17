import Component, { html, css } from '../script/Component.js';
import { updateChildrenAttribute } from '../script/DOM.js';

const style = css`
  :host {display: block}
  audio {
    border-radius: 0;
    outline: none;
    background-color: #F3F4F5;
    display: block;
    width: 100%;
  }`;

const attributes = {
  /** src */
    src(root, value) { updateChildrenAttribute(root, 'audio', 'src', value) }
  }
const properties = {}

/** {UIAudio} @class
  * @description Элемент для воспроизведения аудиофайлов
  */
  export default class UIAudio extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <audio controls></audio>
      </template>`;

  /** Создание компонента {UIAudio} @constructor
    * @param {string?} src адрес аудиофайла
    */
    constructor(src) {
      super();
      if (src) this.src = src;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIAudio} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIAudio, 'ui-audio', { attributes, properties });
