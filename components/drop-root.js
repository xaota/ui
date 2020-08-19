import Component, {html, css} from '../script/Component.js';
import UIDrop from './drop.js';

const style = css`
  :host {
    display: inline-block;
    position: relative;
    --indent: 8px;
  }

  slot {
    display: block;
  }

  ui-drop {
    position: absolute;
    /* transform: scaleY(0); */
    /* top: var(--indent);
    left: var(--indent); */
  }

  :host(:focus-within) ui-drop {
    /* transform: scaleY(1); */
  }

  /* #region [Layout] Положение подсказки @TODO: */
  /* outset (default) */
  :host ui-drop, :host([y="top"]) ui-drop {
    top: calc(var(--indent));
  }
  :host([y="bottom"]) ui-drop {
    top: auto;
    bottom: var(--indent);
  }
  /*
  :host([y="center"]) ui-drop {
    top: 50%;
    bottom: auto;
    transform: translateY(-50%);
  }

  :host ui-drop, :host([x="center"]) ui-drop {
    left: 50%;
    transform: translateX(-50%);
  }*/
  :host([x="left"]) ui-drop {
    left: auto;
    right: var(--indent);
    /* transform: none; */
  }
  /* :host([x="right"]) ui-drop {
    left: calc(100% + var(--indent));
    transform: none;
  } */
  /*
  :host([x="center"][y="center"]) ui-drop {
    transform: translate(-50%, -50%);
  }
  :host([x="right"][y="center"]) ui-drop,
  :host([x="left"][y="center"]) ui-drop {
    transform: translate(0, -50%)
  } */

  /* OUTSET */
  :host([outset]) ui-drop, :host([outset][y="top"]) ui-drop {
    top: calc(100% + var(--indent));
    bottom: auto;
  }
  :host([outset][y="bottom"]) ui-drop {
    bottom: calc(100% + var(--indent));
    top: auto;
  }
  /*:host([outset][y="center"]) ui-drop {
    top: 50%;
    bottom: auto;
    transform: translateY(-50%);
  }

  :host([outset][x="left"]) ui-drop {
    left: var(--indent);
    right: auto;
    // transform: none;
  }
  :host([outset][x="right"]) ui-drop {
    left: auto;
    right: var(--indent);
    // transform: none;
  }

  :host([outset][x="center"][y="center"]) ui-drop {
    transform: translate(-50%, -50%);
  } */
  /* #endregion */`;

const attributes = {}
const properties = {}

/** {UIDropRoot} @class
  * @description Отображение блока простого текста
  */
  export default class UIDropRoot extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <ui-drop>
          <slot name="drop"></slot>
        </ui-drop>
      </template>`;

  // /** Создание компонента {UIDropRoot} @constructor
  //   */
    // constructor() {
    //   super();
    // }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIDropRoot} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const drop = node.querySelector('ui-drop');
      const slot = node.querySelector('slot:not([name])');

      // root.addEventListener('click', _ => drop.forEach(e => e.style.display = 'block'), {once: true});
      slot.addEventListener('click', _ => {
        console.log('slot click');
        drop.visible = !drop.visible;
        // setTimeout(() => drop.visible = false, 400);
      });
      return this;
    }
  }

Component.init(UIDropRoot, 'ui-drop-root', {attributes, properties});
