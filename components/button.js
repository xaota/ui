import Component, { html, css, url } from '../script/Component.js';
import { drawRipple } from '../script/Material.js';
import { pointerOffset } from '../script/DOM.js';

const style = css`
  @import "${url('../style/color.css', import.meta.url)}";
  :host {
    display: inline-block;
    position: relative;
    --duration: .24s;
    --size: 200px;
    --radius: 2px;
    --contrast: 1px;
    /* box-sizing: border-box; */
  }

  :host([hidden]) {
    display: none;
  }

  :host([disabled]) {
    --fill-active: var(--fill-static);
    cursor: default;
  }

  :host([disabled]):after {
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    content: '';
    background: rgba(255, 255, 255, .3);
  }

  /* */
  button {
    border-radius: var(--radius);
    background-color: var(--fill-static);
    color: var(--fill-stroke);
    /* text-shadow: 0 0 var(--contrast) var(--text-shadow); */
    border: none;
    display: block;
    width: 100%;
    box-sizing: border-box;
    user-select: none;
    font-size: 1.1em;
    font-weight: 200;
    padding: 0.4em 1.2em 0.5em;
    outline: none;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-transform: lowercase;
    font-variant: small-caps;
  }

  :host([text]) button {
    background: none;
  }

  :host([text][mode]) button {
    color: var(--fill-static);
  }

  :host([text="outline"]) button {
    border: 1px solid var(--fill-static);
    padding: calc(0.4em - 1px) calc(1.2em - 1px) calc(0.5em - 1px);
  }

  button:hover {
    background-color: var(--fill-active);
  }

  div.ripple {
    background: var(--fill-ripple);
    position: absolute;
    border-radius: 50%;
    width: 0;
    height: 0;
    transition: var(--duration) all ease-in;
    transform: translate(-50%, -50%);
  }

  div.ripple.run {
    width: var(--size);
    height: var(--size);
    background-color: var(--fill-static);
  }

  slot {
    display: block;
    position: relative;
    font-family: var(--font);
  }

  :slotted(*) {
    display: inline-block;
  }

  ::slotted(ui-icon),
  ::slotted(label) {
    margin-top:    -0.7em;
    margin-bottom: -0.3em;
  }

  ::slotted(ui-icon:not(:only-child):first-child) {
    margin-right: 0.3em;
    margin-left: -0.6em;
  }

  ::slotted(ui-icon:not(:only-child):last-child) {
    margin-left: 0.3em;
    margin-right: -0.6em;
  }

  ::slotted(ui-icon:only-child),
  ::slotted(label) {
    margin-left: -1.2em;
    margin-right: -1.2em;
  }`;

const attributes = {
  mode() {},
  text() {}
}
const properties = {
  disabled() {}
}

/** {UIButton} @class
  * @description Отображение кнопки
  */
  export default class UIButton extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <button><slot></slot></button>
      </template>`;

  /** Создание компонента {UIButton} @constructor
    * @param {object|string} content? название кнопки
    */
    constructor(content) {
      super();
      if (content === undefined) return;
      if (typeof content !== 'object') content = { label: content };

      if ('label' in content) this.innerText = content.label;
      if ('mode'  in content && content.mode) this.mode = content.mode;
      if ('text'  in content && content.text) this.text = content.text;
      if ('disabled' in content && content.disabled === true) this.disabled = true;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIButton} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const button = node.querySelector('button');
      this.addEventListener('click', event => {
        // @ts-ignore
        if (this.disabled) return event.stopImmediatePropagation();
        const position = pointerOffset(button, event);
        drawRipple.call(button, position);
      });
      return this;
    }
  }

Component.init(UIButton, 'ui-button', { attributes, properties });
