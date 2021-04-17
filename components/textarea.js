import Component, { html, css } from '../script/Component.js';
import { updateChildrenElement, pointerOffset, updateChildrenText } from '../script/DOM.js';
import { drawRipple } from '../script/Material.js';
import UIIcon from './icon.js';

const style = css`
  :host {
    display: inline-block;
    --duration: .2s;
    --size: 200px;
    --radius: 2px;
    --contrast: 1px;

    --stroke-static: var(--color-details);
    --stroke-active: var(--color-details-dark);
    --stroke-ripple: var(--color-text-lighten);
    --fill-ripple:   var(--color-details-light);

    vertical-align: bottom;
  }

  div.root {
    box-sizing: border-box;
    user-select: none;
    font: var(--font);
    transition: 0.3s all ease;
    position: relative;
    overflow: hidden;
    outline: none;
    padding: 0;
    border: 1px solid var(--stroke-ripple);
    border-bottom: 1px solid var(--stroke-static);
    background-repeat: no-repeat;
    resize: both;
    height: 100%;
  }

  div.root:hover {
    border-bottom-color: var(--fill-ripple);
  }

  div.root:focus-within {
    border-bottom-color: var(--stroke-active);
  }

  div.root > textarea {
    /* box-sizing: border-box; */
    outline: none;
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 1.2em 0.6em;
    background: none;
    border: none;
    font: var(--font);
    transition: 0.2s all ease;
    resize: none;
    color: var(--color-foreground);
  }

  div.root > textarea:focus, div.root > textarea:valid {
    padding: 1.5em 0.6em 0.9em;
  }

  div.root > textarea + label {
    position: absolute;
    color: gray;
    left: 0.6em;
    pointer-events: none;
    transition: 0.2s all ease;
    top: 1.5em;
    font: var(--font);
  }

  div.root > textarea:focus + label, div.root > textarea:valid + label {
    font-size: .8em;
    color: var(--stroke-active);
    top: .2em;
  }

  div.root > textarea::-webkit-input-placeholder {
    color: transparent;
  }
  div.root > textarea:focus::-webkit-input-placeholder {
    color: lightgray;
  }
  /*
  ::-moz-placeholder          { color: blue; } // Firefox 19+
  :-ms-input-placeholder      { color: blue; }
  */

 :host(:not([icon])) ui-icon { /* , ui-icon:empty */
    display: none;
  }
  :host([icon]) ui-icon {
    display: block;
    position: absolute;
    pointer-events: none;
  }
  :host([icon]:not([right])) div.root > ui-icon {
    left: 0.3em;
    top: 1.4em;
  }
  :host([icon]:not([right])) div.root > textarea {
    padding-left: 2em;
  }
  :host([icon]:not([right])) div.root > textarea + label {
    left: 2.3em;
  }

  :host([icon][right]) div.root > ui-icon {
    right: 0.3em;
    top: 1.4em;
  }
  :host([icon][right]) div.root > textarea {
    padding-right: 2em;
  }


  :host-context([fold]) div.root > textarea:not(:valid) {
    width: 0;
  }
  :host-context([fold]) div.root > textarea:focus {
    width: 100%;
  }
  :host-context([fold]) div.root > textarea:not(:focus):not(:valid) + label {
    display: none;
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
  }

  /* div.root:before, */
  div.root:after {
    content: '';
    position: absolute;
    display: block;
    height: 0;
    width: 0;
    bottom: 0;
    left: 50%;
    border: 1px solid var(--stroke-active);
    border-left: none;
    border-right: none;
    transition: .2s width ease, .2s left ease;
  }

  div.root:focus-within:after {
    left: 0;
    width: 100%;
  }`;

const attributes = {
  /** */
    value(root, value) { updateChildrenElement(root, 'textarea', 'value', value) },
  /** */
    placeholder(root, value) { updateChildrenElement(root, 'textarea', 'placeholder', value) },
  /** */
    icon(root, value) { updateChildrenText(root, 'ui-icon', value) }
  }
const properties = {
  /** */
    right() {},
  /** */
    disabled(root, value) { updateChildrenElement(root, 'textarea', 'disabled', [true, ''].includes(value)) }
  }

/** {UITextarea} @class
  * @description Отображение блока простого текста
  */
  export default class UITextarea extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div class="root">
          <textarea required></textarea>
          <label><slot></slot></label>
          <ui-icon></ui-icon>
        </div>
      </template>`;

  /** Создание компонента {UITextarea} @constructor
    * @param {string?} label название области ввода текста
    */
    constructor(label) {
      super();
      if (label) this.innerText = label;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UITextarea} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const root = node.querySelector('div.root');
      root.addEventListener('click', event => {
        const position = pointerOffset(root, event);
        root.style.setProperty('--position', position.x + 'px');
        drawRipple.call(root, position);
      });

      const textarea = node.querySelector('div.root > textarea');
      textarea.addEventListener('blur', _ => {
        root.style.setProperty('--position', '50%');
      });

      textarea.addEventListener('input', _ => this.value = textarea.value);
      textarea.addEventListener('change', _ => this.event('change'));
      this.addEventListener('focus', _ => textarea.focus());

      return this;
    }
  }

Component.init(UITextarea, 'ui-textarea', { attributes, properties });
