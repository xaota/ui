import Component, {html, css, url} from '../script/Component.js';
import {updateChildrenElement, pointerOffset} from '../script/DOM.js';
import {drawRipple} from '../script/Material.js';

const style = css`
  @import "${url('../style/color.css', import.meta.url)}";
  :host {
    display: inline-block;
    --duration: .2s;
    --size: 200px;
    --radius: 2px;
    --contrast: 1px;

    --padding-left: 0px;
    --left: calc(var(--padding-left) + 0.6em);
    vertical-align: bottom;
  }

  div.root {
    user-select: none;
    font: normal 1em / normal Tahoma, sans-serif;
    transition: 0.3s all ease;
    position: relative;
    overflow: hidden;
    outline: none;
    /* padding: 0; */
    border-bottom: 1px solid var(--stroke-static);
    background-repeat: no-repeat;
  }

  div.root:hover {
    border-bottom-color: var(--stroke-ripple);
  }

  div.root:focus-within {
    border-bottom-color: var(--stroke-active);
  }

  div.root > input {
    /* box-sizing: border-box; */
    outline: none;
    display: block;
    width: 100%;
    margin: 0;
    padding: 1.2em 0.6em 1.2em var(--left);
    background: none;
    border: none;
    font: normal 1em / normal Tahoma, sans-serif;
    transition: 0.2s all ease;
  }

  div.root > input:focus, div.root > input:valid {
    padding: 1.5em 0.6em 0.9em var(--left);
  }

  div.root > input + label {
    position: absolute;
    color: gray;
    left: var(--left);
    pointer-events: none;
    transition: 0.2s all ease;
    top: 1.5em;
    font: normal 1em / normal Tahoma, sans-serif;
    white-space: nowrap;
  }

  div.root > input:focus + label, div.root > input:valid + label {
    font-size: .8em;
    color: var(--stroke-active);
    /* left: 0.6em; */
    top: .2em;
  }

  div.root > input:valid:not(:focus) + label {
    left: 0.6em;
  }

  div.root > input::-webkit-input-placeholder {
    color: transparent;
  }
  div.root > input:focus::-webkit-input-placeholder {
    color: lightgray;
  }
  /* ::-moz-placeholder          { color: blue; } // Firefox 19+
  :-ms-input-placeholder      { color: blue; } */

  :host([icon]:not([right])) div.root {
    background-position: left 0.3em top 1.4em;
  }
  :host([icon]:not([right])) div.root > input {
    padding-left: 2em;
  }
  :host([icon]:not([right])) div.root > input + label {
    left: 2.3em;
  }

  :host([icon][right]) div.root {
    background-position: right 0.3em top 1.4em;
  }
  :host([icon][right]) div.root > input {
    padding-right: 2em;
  }


  :host([fold]) div.root > input:not(:valid) {
    width: 0;
  }
  :host([fold]) div.root > input:focus {
    width: 100%;
  }
  :host([fold]) div.root > input:not(:focus):not(:valid) + label {
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
  value(root, value) { updateChildrenElement(root, 'input', 'value', value) },
  placeholder(root, value) { updateChildrenElement(root, 'input', 'placeholder', value) },
  icon(root, value) { setIcon(value, root) }
}
const properties = {}

/** {UIInput} @class
  * @description Отображение блока простого текста
  */
  export default class UIInput extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div class="root">
          <input required />
          <label><slot></slot></label>
        </div>
      </template>`;

  /** Создание компонента {UIInput} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIInput} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const input = node.querySelector('input');

      const root = node.querySelector('div.root');
      root.addEventListener('click', event => {
        const position = pointerOffset(root, event);
        root.style.setProperty('--position', position.x + 'px');
        drawRipple.call(root, position);
      });
      input.addEventListener('blur', _ => {
        root.style.setProperty('--position', '50%');
      });

      input.addEventListener('input', _ => this.value = input.value);
      input.addEventListener('change', _ => this.event('change'));
      input.addEventListener('keydown', e => { if (e.key === 'Enter') return this.event('enter') });
      this.addEventListener('focus', _ => input.focus());
      return this;
    }
  }

Component.init(UIInput, 'ui-input', {attributes, properties});

// #region [Private]
/** */
  function setIcon(icon, root) {
    if (!root || !root.style) return;
    if (!icon) return root.style.backgroundImage = 'none';
    // const href = UIIcon.src(icon);
    // root.style.backgroundImage = `url(${href.toString()})`;
  }
// #endregion
