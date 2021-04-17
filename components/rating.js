import Component, { html, css } from '../script/Component.js';
import UIIcon from './icon.js';

const style = css`
  :host {
    display: block;
  }

  div.root {
    display: block;
    font-size: 0;
  }

  div.item {
    display: inline-block;
    /* padding-left: 24px; */
    background-position: left top;
    background-repeat: no-repeat;
    height: 24px;
    cursor: pointer;
  }

  div.item > ui-icon {
    display: none;
  }

  div.item > ui-icon.border {
    display: inline-block;
  }

  :host(:not([disabled])) div.item:hover > ui-icon.border {
    display: none;
  }

  :host(:not([disabled])) div.item:hover > ui-icon.active {
    display: inline-block;
  }

  div.item.star > ui-icon.border {
    display: none;
  }

  :host(:not([disabled])) div.item.star:hover > ui-icon.active {
    display: none;
  }

  div.item.star > ui-icon.star {
    display: inline-block;
  }

  div.item.half > ui-icon.border {
    display: none;
  }

  /* div.item.half:hover > ui-icon.active {
    display: block;
  } */

  div.item.half > ui-icon.half {
    display: inline-block;
  }

  :host(:not([disabled])) div.item.half:hover > ui-icon.half {
    display: none;
  }`;

const attributes = {
  value(root, value) { this.store({ value: parseFloat(value) }) }
}
const properties = {
  disabled() {}
}

/** {UIRating} @class
  * @description Отображение блока простого текста
  */
  export default class UIRating extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div class="root"></div>
      </template>`;

  /** Создание компонента {UIRating} @constructor
    * @param {number?} value значение оценки
    */
    constructor(value) {
      super();
      if (value) this.value = value;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIRating} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      this.paint();
      return this;
    }

    render(node) {
      const { value = 0 } = this.store();
      setValue(node, value);
    }

  /** */
    paint() {
      const node = this.shadowRoot;
      const length = 5;
      const root = node.querySelector('div.root');
      root.innerHTML = '';

      Array.from({ length }, _ => document.createElement('div'))
        .reduce((root, div, index) => {
          div.classList.add('item');
          const border = new UIIcon('star_border');
          const star =   new UIIcon('star');
          const half =   new UIIcon('star_half');
          const active = new UIIcon('star-active');
          border.classList.add('border');
          star.classList.add('star');
          half.classList.add('half');
          active.classList.add('active');
          div.appendChild(border);
          div.appendChild(star);
          div.appendChild(half);
          div.appendChild(active);

          root.appendChild(div);
          if (!this.disabled) {
 div.addEventListener('click', e => {
            this.value = index + 1;
            // e.cancelBubble = true;
            // e.preventDefault();
            e.stopPropagation();
            return false;
          });
}

          return div;
        }, root);

      return this;
    }
  }

Component.init(UIRating, 'ui-rating', { attributes, properties });

// #region [Private]
/** */
  function setValue(node, value, item) {
    if (isNaN(value)) return;
    const items = [...node.querySelectorAll('div.item')];
    items.forEach(div => div.classList.remove('star', 'half'));
    depth(node, value);
  }

/** */
  function depth(root, count) {
    const item = root.querySelector('div.item');
    if (!item) return;
    item.classList.add(count >= 1 ? 'star' : 'half');
    count -= 1;
    if (count <= 0) return;
    if (count >= 1) return depth(item, count);
    if (count > 0) return depth(item);
  }
// #endregion
