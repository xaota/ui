import Component, { html, css } from '../script/Component.js';
import UIIcon from './icon.js';

const attributes = {
  label(root, value) { },
  href(root, value) {
    const link = root.querySelector('a[download]');
    link.href = value || '';
  }
};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  a[download] {
    display: grid;
    height: 48px;

    background: rgba(65, 93, 232, 0.04);
    border: 1px solid #758EF0;
    border-radius: 12px;
    text-decoration: none;

    grid-template-columns: 60px auto 90px;
    grid-template-rows: 100%;
    align-items: center;
    justify-items: center;
  }
  slot {
    color: white;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }`;

/** Download {UIDownload} @class @ui @component <ui-download />
  * Отображает ссылку на файл для загрузки
  */
  export default class UIDownload extends Component {
    static template = html`
      <template>
        <style>${style}</style>

        <a download>
          <ui-icon>document</ui-icon>
          <slot></slot>
          <div>
            <ui-icon>delete-outline</ui-icon>
            <ui-icon>download-file</ui-icon>
          </div>
        </a>
      </template>`;

  /** Создание компонента {UIDownload} @constructor
    * @param {}
    */
    constructor() {
      super();
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIDownload} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      return this;
    }
  }

Component.init(UIDownload, 'ui-download', { attributes, properties });
