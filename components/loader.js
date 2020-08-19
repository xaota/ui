import Component, {html, css} from '../script/Component.js';
import {cssVariable} from '../script/DOM.js';

const style = css`
  :host {
    display: inline-block;
    --size: 48px;
    --stroke: 4px;
    --angle: 45deg;
    --fill: 40;
    --font-weight: 700;
    --text: '65%';
    --background: transparent;
    --color: var(--color-details);
  }

  /* #region [Clear] */
    meter {
      -webkit-appearance: none;
      appearance: none;
    }
    ::-webkit-meter-bar, ::-webkit-meter-optimum-value, ::-webkit-meter-suboptimum-value, ::-webkit-meter-even-less-good-value {
      display: none;
    }
  /* #endregion */

  meter {
    position: relative;
    width: var(--size);
    height: var(--size);
    text-align: center;

    animation: progress-circular-rotate 1.4s linear infinite;
  }

  meter:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    /* background: conic-gradient(CornflowerBlue var(--fill), lightgrey 0); */
    --edge: calc(100% - var(--stroke));
    -webkit-mask: radial-gradient(closest-side, transparent var(--edge), black var(--edge));
    background: conic-gradient(from var(--angle), var(--color) var(--fill), var(--background) 0);
  }
  /* overlays text*/
  /* meter:after {
    content: var(--text);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--font-weight);
  } */

  @keyframes progress-circular-rotate {
    100% {
      transform: rotate(360deg)
    }
  }`;

const attributes = {
  value(root, value) { this.increase = false; }
}
const properties = {}
// UI.attributes(UILoader, 'min', 'max', 'value', 'mode', 'color', 'background', 'size', 'angle', 'low', 'high', 'optium', 'stroke', 'speed');
// UI.properties(UILoader, 'disabled', 'linear', 'fill', 'reverse');

const colors = ['lime', 'aqua', 'blue', 'magenta'];
const speed = 1400;

/** {UILoader} @class
  * @description Отображение блока простого текста
  */
  export default class UILoader extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <meter></meter>
      </template>`;

  /** Создание компонента {UILoader} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UILoader} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      this.increase = true;
      // console.log('value', value);
      let current = 0;
      // duration
      cssVariable(this, 'color', colors.join(','));

      // var start = performance.now();
      var previous;
      const frame = callback.bind(this);
      this.animation = window.requestAnimationFrame(frame);
      node.addEventListener('click', () => {
        this.value = 20;
      });

      /** */
      function callback(timestamp) {
        if (!previous) previous = timestamp;
        const delay = timestamp - previous;
        previous = timestamp;

        const increment = delay * 100 / speed;

        const value = this.value;
        let increase = this.increase;

        if (increase && current >= value || !increase && current <= 0) {
          increase = !increase;
          if (increase) cssVariable(this, 'color', colors.reverse().join(','));
        }
        this.increase = increase;
        current += increase ? increment : -increment / 2;
        if (current < 0) current = 0;
        // if (current > value) current = value;
        // console.log(delay, current, increment);
        cssVariable(this, 'fill', current + '%');

        this.animation = window.requestAnimationFrame(frame);
      }

      return this;
    }

  /** */
    unmount() {
      window.cancelAnimationFrame(this.animation);
      return this;
    }
  }

Component.init(UILoader, 'ui-loader', {attributes, properties});
