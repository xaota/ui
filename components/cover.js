import Component, { html, css } from '../script/Component.js';
import $, { slottedValue } from '../script/DOM.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: inline-block;
    --cover-width-default: 200px;
    --cover-padding: 6px;
    position: relative;
    text-align: left;
  }
  :host([view="empty"]) {
    --cover-width-default: 120px;
  }
  :host([view="list"]) {
    display: inline-flex;
  }
  :host([view="list"]), :host([view="text"]) {
    --cover-width-default: 40px;
  }
  #cover {
    width: var(--cover-width, var(--cover-width-default));
    height: var(--cover-width, var(--cover-width-default));
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: var(--cover-padding);
  }
  :host([view="text"]) #cover {
    display: none;
  }
  slot {
    font-size: calc(var(--cover-padding) * 2);
    display: block;
  }
  slot:not([name]) {
    display: none;
  }
  slot[name="caption"] {
    /* color: rgba(255, 255, 255, 0.92); */
    color: var(--foreground);
  }
  slot[name="description"], slot[name="author"] {
    /* color: rgba(255, 255, 255, 0.64); */
    color: var(--foreground-light);
  }
  #info {
    padding: var(--cover-padding);
  }
  :host([view="compact"]) #info {
    padding: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.5) 20%, black 90%);
  }
  :host([view="empty"]) #info {
    display: none;
  }`;

/** Cover {UICover} @class @ui @component <ui-cover />
  * Covers for media elements
  */
  export default class UICover extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div id="cover"></div>
        <div id="info">
          <slot name="caption"></slot>
          <slot name="description"></slot>
          <slot name="author"></slot>
          <slot name="keywords"></slot>
          <slot name="actions"></slot>
          <slot name="timestamp"></slot>
        </div>
        <slot></slot>
      </template>`;

  // /** Создание компонента {UICover} @constructor
  //   */
  //   constructor(store) {
  //     super();
  //   }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UICover} this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const slotDefault = $('slot:not([name])', node);
      const cover = $('#cover', node);
      slotDefault.addEventListener('slotchange', () => {
        const url = slottedValue(slotDefault);
        console.log(url);
        cover.style.backgroundImage = `url(${url})`;
      });
      return this;
    }
  }

Component.init(UICover, 'ui-cover', { attributes, properties });
