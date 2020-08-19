import Component, {html, css} from '../script/Component.js';
import {updateChildrenHTML} from '../script/DOM.js';

const style = css`
  :host {
    --color: #616161;
    --arrow: 4px;
    --width: 320px;

    display: inline-block;
    position: relative;
  }

  ::slotted(*) {
    /* display: inline-block; */
  }

  :host > div.root {
    display: none;
    color: #fff;
    padding: 4px 8px;
    font-size: 0.625rem;
    max-width: var(--width);
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    line-height: 1.4em;
    border-radius: 4px;
    background-color: var(--color);
    position: absolute;
    z-index: 2;
  }

  :host(:hover) > div.root:not(:empty) {
    display: block;
  }

  /* #region [Layout] Положение подсказки */
    :host > div.root, :host([y="top"]) > div.root {
      bottom: calc(100% + 8px);
    }
    :host([y="bottom"]) > div.root {
      top: calc(100% + 8px);
      bottom: auto;
    }
    :host([y="center"]) > div.root {
      top: 50%;
      bottom: auto;
      transform: translateY(-50%);
    }

    :host > div.root, :host([x="center"]) > div.root {
      left: 50%;
      transform: translateX(-50%);
    }
    :host([x="left"]) > div.root {
      left: auto;
      right: calc(100% + 8px);
      transform: none;
    }
    :host([x="right"]) > div.root {
      left: calc(100% + 8px);
      transform: none;
    }

    :host([x="center"][y="center"]) > div.root {
      transform: translate(-50%, -50%);
    }
    :host([x="right"][y="center"]) > div.root,
    :host([x="left"][y="center"]) > div.root {
      transform: translate(0, -50%)
    }

    /* INSET */
    :host([inset]) > div.root, :host([inset][y="top"]) > div.root {
      top: 8px;
      bottom: auto;
    }
    :host([inset][y="bottom"]) > div.root {
      bottom: 8px;
      top: auto;
    }
    :host([inset][y="center"]) > div.root {
      top: 50%;
      bottom: auto;
      transform: translateY(-50%);
    }

    :host([inset][x="left"]) > div.root {
      left: 8px;
      right: auto;
      /* transform: none; */
    }
    :host([inset][x="right"]) > div.root {
      left: auto;
      right: 8px;
      /* transform: none; */
    }

    :host([inset][x="center"][y="center"]) > div.root {
      transform: translate(-50%, -50%);
    }
  /* #endregion */

  /* #region [Layout] Положение уголка */
    :host(:not([inset])) > div.root:before {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border: var(--arrow) solid transparent;
      position: absolute;
    }

    :host(:not([inset])) > div.root:before, :host([y="top"]:not([inset])) > div.root:before {
      top: 100%;
      left: calc(50% - var(--arrow));
      border-top-color: var(--color);
    }

    :host([y="bottom"]:not([inset])) > div.root:before {
      top: auto;
      bottom: 100%;
      left: calc(50% - var(--arrow));
      border-color: transparent;
      border-bottom-color: var(--color);
    }

    :host([y="center"][x="left"]:not([inset])) > div.root:before {
      left: 100%;
      top: calc(50% - var(--arrow));
      border-top-color: transparent;
      border-left-color: var(--color);
    }

    :host([y="center"][x="right"]:not([inset])) > div.root:before {
      left: auto;
      right: 100%;
      top: calc(50% - var(--arrow));
      border-top-color: transparent;
      border-right-color: var(--color);
    }

    :host([x="left"][y="bottom"]:not([inset]))   > div.root:before,
    :host([x="left"][y="top"]:not([inset]))      > div.root:before,
    :host([x="right"][y="bottom"]:not([inset]))  > div.root:before,
    :host([x="right"][y="top"]:not([inset]))     > div.root:before,
    :host([x="center"][y="center"]) > div.root:before {
      display: none;
    }

    :host([x="left"][y="bottom"]:not([inset])) > div.root {
      border-top-right-radius: 0;
    }

    :host([x="left"][y="top"]:not([inset])) > div.root {
      border-bottom-right-radius: 0;
    }

    :host([x="right"][y="bottom"]:not([inset])) > div.root {
      border-top-left-radius: 0;
    }

    :host([x="right"][y="top"]:not([inset])) > div.root {
      border-bottom-left-radius: 0;
    }
  /* #endregion */`;

const attributes = {
  content(root, value) { updateChildrenHTML(root, 'div.root', value) }
}
const properties = {}

/** {UITooltip} @class
  * @description Отображение блока простого текста
  */
  export default class UITooltip extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <div class="root"></div>
      </template>`;

  /** Создание компонента {UIText} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UITooltip} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UITooltip, 'ui-tooltip', {attributes, properties});
