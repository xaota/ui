import Component, {html, css} from '../script/Component.js';
import UISliderItem from './slider-item.js';
import UIButton     from './button.js';
import UIRadioGroup from './radio-group.js';
import UIRadio      from './radio.js';

const style = css`
  :host {
    --content-width: var(--width);
    --content-height: var(--height);

    display: block;
    width: var(--content-width);
    position: relative;
  }

  slot {
    font-size: 0;
    display: block;
    scroll-snap-type: x mandatory;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }

  slot::-webkit-scrollbar {
    display: none;
  }

  ::slotted(ui-slider-item) {
    scroll-snap-align: center;
    display: block;
    width: 100%;
    height: var(--content-height);
    position: relative;
    display: inline-block;
    font-size: 1em;
  }

  ui-button-icon {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }

  #left {
    left: 0.5em;
  }

  #right {
    right: 0.5em;
  }

  ui-radio-group {
    display: block;
    text-align: center;
    white-space: nowrap;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  ui-radio {
    transform: scale(0.4);
  }`;

const attributes = {}
const properties = {}

/** Галерея @class {UISlider}
  * @description Слайдер для переключения каких-либо элементов, например, изображений
  */
  export default class UISlider extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <!-- слайды -->
        <slot></slot>
        <!-- стрелочки -->
        <ui-button-icon text id="left">keyboard_arrow_left</ui-button-icon>
        <ui-button-icon text id="right">keyboard_arrow_right</ui-button-icon>
        <!-- переход к слайдам по точкам -->
        <ui-radio-group></ui-radio-group>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UISlider} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const carousel = node.querySelector('slot');

      // точки
      let items, count = 0;
      const footer = node.querySelector('ui-radio-group');
      footer.addEventListener('change', e => swipeToItem(carousel, e.detail.value, count));

      carousel.addEventListener('slotchange', () => {
        items = [...carousel.assignedElements()]
          .filter(e => UISliderItem.is(e));
        count = items.length;

        footer.innerHTML = '';
        for (let index = 0; index < count; ++index) {
          const radio = new UIRadio();
          radio.value = index;
          footer.appendChild(radio);
        }
      });

      // стрелочки
      const controls = {
        left: node.querySelector('#left'),
        right: node.querySelector('#right')
      };
      controls.left.addEventListener('click', () => swipe(carousel, -1, footer));
      controls.right.addEventListener('click', () => swipe(carousel, 1, footer));

      setTimeout(() => footer.value = 0, 100); // items.findIndex(e => e.selected) (-1 -> 0)

      return this;
    }
  }

Component.init(UISlider, 'ui-text', {attributes, properties});

// #region [Private]
/** */
  function swipe(carousel, delta, footer) {
    const children = [...footer.children];
    const count = children.length;
    let current = children.findIndex(e => e.checked);
    if (current < 0) current = 0;
    const index = current + delta;
    const item  = index < 0 ? count - 1 : index >= count ? 0 : index;
    const value = children[item].value;
    swipeToItem(carousel, item, value, count);
    setTimeout(() => footer.value = value, 100);
  }

/** */
  function swipeToItem(carousel, item, count) {
    const left = Math.floor(carousel.scrollWidth * (item / count));
    const options = {left, top: 0, behavior: 'smooth'};
    carousel.scrollTo(options);
  }
// #endregion
