import Component, { html, css, url } from '../script/Component.js';
import { updateChildrenAttribute, updateChildrenText } from '../script/DOM.js';
// eslint-disable-next-line no-unused-vars
import UIText from './text.js';
// eslint-disable-next-line no-unused-vars
import UIIcon from './icon.js';

const style = css`
  @import "${url('../style/color.css', import.meta.url)}";
  :host {
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;

    --size: 48px;

    width: var(--size);
    height: var(--size);
    background-color: var(--fill-static);
    color: var(--fill-stroke);

    font-family: CustomSansSerif, 'Lucida Grande', Arial, sans-serif;
    font-size: calc(var(--size) / 2);
    font-weight: 100;
    line-height: var(--size);
    text-align: center;

    position: relative;
  }

  ui-icon {
    position: absolute;
    width: 70%;
    height: 70%;
    left: 15%;
    top: 14%;
    display: none;
  }

  :host > img:not([src]) ~ ui-icon:not(:empty) {
    display: block;
  }

  ui-icon:not(:empty) + ui-text {
    display: none;
  }

  :host > img {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  :host > img:not([src]),
  :host > img[src$=".svg"] ~ ui-text,
  :host > img[src$=".svg"] ~ ui-icon {
    display: none;
  }

  slot {
    display: none;
  }`;

const attributes = {
  /** size */
    size(root, value) {
      this.style.setProperty('--size', value ?? '')
    },
  /** src */
    src(root, value) { updateChildrenAttribute(root, 'img', 'src', value) },
  /** icon */
    icon(root, value) { updateChildrenText(root, 'ui-icon', value) },
  /** color */
    color(root, value) {
      this.style.backgroundColor = value;
    }
  }
const properties = {}

/** Компонент отображения аватара пользователя @class {UIAvatar} @extends {Component}
  * Порядок наложения атрибутов: color->+innerText->icon->src
  * letter устанавливается автоматически из переданного innerText
  */
  export default class UIAvatar extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <img src="" alt="" />
        <ui-icon>create</ui-icon>
        <ui-text></ui-text>
      </template>`;

  /** Создание компонента {UIAvatar} @constructor
    * @param {string|object} options название аватара или его опции
    */
    constructor(options) {
      super();
      if (!options) return;
      if (!options.text) options = { text: options };
      this.innerText = options.text;
      if (options.src)   this.src   = options.src;
      if (options.icon)  this.icon  = options.icon;
      if (options.size)  this.size  = options.size;
      if (options.color) this.color = options.color;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIAvatar} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const slot = node.querySelector('slot');
      slot.addEventListener('slotchange', _ => {
        const value = letter(this.textContent);
        updateChildrenText(node, 'ui-text', value);
      });
      return this;
    }
  }

Component.init(UIAvatar, 'ui-avatar', { attributes, properties });

// #region [Private]
/** setText */
function letter(value) {
  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(e => e.charAt(0))
    .join('')
    .toUpperCase();
}
// #endregion
