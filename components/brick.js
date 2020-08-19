import Component, {html, css} from '../script/Component.js';

const style = css`
  :host {
    margin: 0;
    padding: 0;
    /* border: 0; */
    font-size: 100%;
    font: inherit;
    /* vertical-align: baseline; */
    box-sizing: border-box;
    /* display: inline-block; */
    list-style: none;
    /* width: 100%; */
    /* width: 210px; */
    margin-bottom: 10px;

    /* list-style: none; */
    /* padding: 0; */
    /* font: inherit; */
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    box-shadow: none;
    border: 1px solid #dfdfdf;
    /* transparent; */
    user-select: none;
    font-weight: inherit;
    /* font-size: inherit; */
    text-decoration: none;
    /* box-sizing: border-box; */
    /* margin: 0; */
    /* color: #777; */
    /* background-color: inherit; */
    border-radius: 3px;
    height: 60px;
    /* width: 100%; */
    display: flex;
    align-items: center;
    font-family: "Source Sans Pro",Arial,Helvetica,sans-serif;
    white-space: normal;
    text-align: left;
    padding-right: 10px;
    outline: none;
  }

  :host(:hover) {
    border-color: #00905D;
  }

  svg {
    list-style: none;
    font: inherit;
    cursor: pointer;
    user-select: none;
    font-weight: inherit;
    font-size: inherit;
    color: #777;
    font-family: "Source Sans Pro",Arial,Helvetica,sans-serif;
    white-space: normal;
    text-align: left;
    flex: 0 0 48px;
    height: 48px;
    width: 48px;
  }

  slot {
    display: inline;
    list-style: none;
    cursor: pointer;
    user-select: none;
    color: #777;
    white-space: normal;
    text-align: left;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
    font-size: 16px;
    /* color: #00905D; */
  }`;

const attributes = {}
const properties = {}

/** {UIBrick} @class
  * @description Отображение блока простого текста
  */
  export default class UIBrick extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <!-- ui-icon? -->
        <svg class="_1bXCdCWv" viewBox="0 0 48 48">
          <path class="LCXMsEM1" fill="#359D6E" fill-rule="evenodd"
            d="M28 33h-1v-2h-1v1h-1v-1h-1v3h-1v-3h-1v1h-1v-1h-1v2h-1v-2h-1v1h-1v-1h-1v3h-1v-3h-1v1h-1v-1h-1v2h-1v-2h-1v1H9v-1H8v6h21v-6h-1v2zm8.5 3.616c-1.74 0-3.15-1.446-3.15-3.23 0-.68.206-1.311.556-1.831.491.315 1.385.695 2.31.108 1.383-.878 2.15.307 2.897.307.07 0 .138-.008.206-.019.21.433.331.919.331 1.435 0 1.784-1.41 3.23-3.15 3.23zm1.5-7.797V28h-1v-1h1v-2h-1v-1h1v-2h-1v-1h1v-2h-1v-1h1v-1c0-.955-.569-2-1.5-2s-1.334 1.045-1.5 2v12c-1.483.684-3 2.449-3 4.386C32 35.934 34.015 38 36.5 38s4.5-2.066 4.5-4.614c0-1.937-1.267-3.883-3-4.567zm-17.019-13.05c-1.092 0-1.982-.869-1.982-1.937 0-1.069.89-1.938 1.982-1.938 1.093 0 1.983.869 1.983 1.938 0 1.068-.89 1.937-1.983 1.937zm6.871.516c-.05-.215-.47-.285-.47-.285h-4.446c.578-.599.942-1.341.942-2.168 0-1.564-1.297-2.832-2.897-2.832-1.599 0-2.896 1.268-2.896 2.832 0 .827.364 1.569.943 2.168h-4.447s-.42.07-.47.285l-2.523 10.757c-.069.295-.398.958-.087.958h19c.31 0-.057-.663-.126-.958l-2.523-10.757z">
          </path>
        </svg>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIBrick} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIBrick} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIBrick, 'ui-brick', {attributes, properties});
