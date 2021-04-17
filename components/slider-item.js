import Component, { html, css } from '../script/Component.js';

const style = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
  }

  slot {
    display: block;
    width: 100%;
    height: 100%;
  }

  ::slotted(*) {
    width: 100%;
    height: 100%;

    /* display: block; */
  }

  ::slotted(img) {
    object-fit: cover;
    object-position: 50% 50%;
  }`;

const attributes = {}
const properties = {}

/** {UISliderItem} @class
  * @description Отображение блока простого текста
  */
  export default class UISliderItem extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UISliderItem} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UISliderItem, 'ui-slider-item', { attributes, properties });
