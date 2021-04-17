import Component, { html, css } from '../script/Component.js';
import { cssVariable, updateChildrenProperty, updateChildrenAttribute } from '../script/DOM.js';

const style = css`
  :host {
    display: inline-block;
    --duration: .2s;
    --size: 12px;
    --reduce: 2px;
    --radius: 6px;
    --height: 2px;

    --stroke-static: var(--color-details-light);
    --stroke-active: var(--color-details);
    --stroke-ripple: var(--color-text-lighten);
    --fill-ripple:   var(--color-details-light);
  }

  div.root {
    /* box-sizing: border-box; */
    user-select: none;
    font: normal 1em / normal Tahoma, sans-serif;
    transition: 0.3s all ease;
    position: relative;
    padding: 1.8em 0 0;
  }

  div.root:hover {
    border-bottom-color: var(--stroke-ripple);
  }

  div.root > input {
    -webkit-appearance: none;
    appearance: none;
    box-sizing: border-box;
    outline: none;
    display: block;
    width: 100%;
    height: var(--height);
    margin: 0;
    padding: 0;
    background: var(--stroke-static);
    border: none;
    outline: none;
    font: normal 1em / normal Tahoma, sans-serif;
    transition: 0.2s all ease;
    border-radius: 0; /* iOS */
  }

  div.root > input::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: var(--stroke-active);
    cursor: pointer;
    transition: .2s ease all;
  }

  div.root > input::-moz-range-progress {
    background: red;
  }

  div.root > input::-moz-range-thumb {
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: var(--stroke-active);
    cursor: pointer;
  }

  div.root > input::-webkit-slider-thumb:hover {
    width: calc(var(--size) - var(--reduce));
    height: calc(var(--size) - var(--reduce));
    margin: calc(var(--reduce) / 2);
    box-shadow: 0 0 0 var(--radius) var(--fill-ripple);
  }

  div.root > input::-moz-range-thumb:hover {
    width: calc(var(--size) - var(--reduce));
    height: calc(var(--size) - var(--reduce));
    margin: calc(var(--reduce) / 2);
    box-shadow: 0 0 0 var(--radius) var(--fill-ripple);
  }

  div.root > input::-webkit-slider-thumb:active {
    box-shadow: 0 0 0 calc(var(--radius) * 2) var(--fill-ripple);
  }

  div.root > input::-moz-range-thumb:active {
    box-shadow: 0 0 0 calc(var(--radius) * 2) var(--fill-ripple);
  }

  div.root > input + label {
    position: absolute;
    color: gray;
    left: 0.6em;
    top: 1.5em;
  }

  div.root > input:focus + label, div.root > input:valid + label {
    font-size: .8em;
    color: var(--stroke-active);
    top: .2em;
  }

  slot {
    display: block;
    position: relative;
  }

  div.root:after {
    content: '';
    position: absolute;
    display: block;
    height: 2px;
    width: var(--value);
    bottom: 0;
    left: 0;
    border: none;
    background: var(--stroke-active);
  }`;

const attributes = {
  /** */
    value(root, value) { updateChildrenAttribute(root, 'input[type="range"]', 'value', value) },
  /** */
    min(root, value) { updateChildrenAttribute(root, 'input[type="range"]', 'min', value) },
  /** */
    max(root, value) { updateChildrenAttribute(root, 'input[type="range"]', 'max', value) },
  /** */
    step(root, value) { updateChildrenAttribute(root, 'input[type="range"]', 'step', value) }
  }
const properties = {
  /** */
    disabled(root, value) { updateChildrenProperty(root, 'input[type="range"]', 'disabled', value) }
  }

/** {UIInputSlider} @class
  * @description Ползунок
  */
  export default class UIInputSlider extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div class="root">
          <input type="range" required />
          <label><slot></slot></label>
        </div>
      </template>`;

  /** Создание компонента {UIInputSlider} @constructor
    * @param {string?} label название поля
    */
    constructor(label) {
      super();
      if (label) this.innerText = label;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIInputSlider} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const input = node.querySelector('input[type="range"]');
      input.addEventListener('input', _ => setValue.call(this, input.value));

      setValue.call(this, this.value);
      return this;
    }
  }

Component.init(UIInputSlider, 'ui-input-slider', { attributes, properties });

// #region [Private]
/** / setValue */
  function setValue(data) {
    const value = data || this.min || 0;
    this.value = value;
    visualise.call(this, this.value || this.min || 0, this.max || 100, this.min || 100);
  }

/** / visualise */
  function visualise(value = 0, max = 100, min = 0) {
    const percent = parseFloat(value) / (parseFloat(max) - parseFloat(min)) * 100;
    cssVariable(this, 'value', percent + '%');
  }
// #endregion
