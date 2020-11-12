import Component, {html, css} from '../script/Component.js';
import {updateChildrenProperty} from '../script/DOM.js';
import UIDropItem from './drop-item.js';

const style = css`
  :host {
    display: block;
    position: relative;
    --indent: 8px;
  }

  :host([inline]) {
    display: inline-block;
  }

  slot {
    display: block;
  }

  ui-drop-item {
    position: absolute;
    /* transform: scaleY(0); */
    /* top: var(--indent);
    left: var(--indent); */
  }

  :host slot:not([name]):focus-within ui-drop-item {
    /* transform: scaleY(1); */
  }

  /* #region [Layout] Положение подсказки @TODO: */
  /* outset (default) */
  :host ui-drop-item, :host([y="top"]) ui-drop-item {
    top: calc(var(--indent));
  }
  :host([y="bottom"]) ui-drop-item {
    top: auto;
    bottom: var(--indent);
  }
  /*
  :host([y="center"]) ui-drop-item {
    top: 50%;
    bottom: auto;
    transform: translateY(-50%);
  }

  :host ui-drop-item, :host([x="center"]) ui-drop-item {
    left: 50%;
    transform: translateX(-50%);
  }*/
  :host([x="left"]) ui-drop-item {
    left: auto;
    right: var(--indent);
    /* transform: none; */
  }
  /* :host([x="right"]) ui-drop-item {
    left: calc(100% + var(--indent));
    transform: none;
  } */
  /*
  :host([x="center"][y="center"]) ui-drop-item {
    transform: translate(-50%, -50%);
  }
  :host([x="right"][y="center"]) ui-drop-item,
  :host([x="left"][y="center"]) ui-drop-item {
    transform: translate(0, -50%)
  } */

  /* OUTSET */
  :host([outset]) ui-drop-item, :host([outset][y="top"]) ui-drop-item {
    top: calc(100% + var(--indent));
    bottom: auto;
  }
  :host([outset][y="bottom"]) ui-drop-item {
    bottom: calc(100% + var(--indent));
    top: auto;
  }
  /*:host([outset][y="center"]) ui-drop-item {
    top: 50%;
    bottom: auto;
    transform: translateY(-50%);
  }

  :host([outset][x="left"]) ui-drop-item {
    left: var(--indent);
    right: auto;
    // transform: none;
  }
  :host([outset][x="right"]) ui-drop-item {
    left: auto;
    right: var(--indent);
    // transform: none;
  }

  :host([outset][x="center"][y="center"]) ui-drop-item {
    transform: translate(-50%, -50%);
  } */
  /* #endregion */`;

const attributes = {}
const properties = {
  disabled() {},
  action() {},
  visible(root, value) {updateChildrenProperty(root, 'ui-drop-item', 'visible', value)}
}

/** Drop {UIDrop} @class @ui @component @tag <ui-drop />
  * @description Выпадающий блок
  */
  export default class UIDrop extends Component {
    static template = html`
      <template>
        <style>${style}</style>

        <slot></slot>

        <ui-drop-item>
          <slot name="drop"></slot>
        </ui-drop-item>
      </template>`;

  /** Создание компонента {UIDrop} @constructor
    * @param {{visible?: boolean, disabled?: boolean, action?: boolean}} props свойства выпадающего блока
    */
    constructor(props) {
      super();
      if (!props) return;
      if (props.visible)  this.visible = true;
      if (props.action)   this.action = true;
      if (props.disabled) this.disabled = true;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIDrop} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const drop = node.querySelector('ui-drop-item');
      const slot = node.querySelector('slot:not([name])');

      slot.addEventListener('focusin', () => {
        if (this.disabled) return;
        this.open();
      });

      this.addEventListener('focusout', () => {
        if (this.action || this.disabled) return;
        this.close();
      });

      return this;
    }

    open() {
      this.visible = true;
      return this;
    }

    close() {
      this.visible = false;
      return this;
    }

    toggle() {
      this.visible = !this.visible;
      return this;
    }
  }

Component.init(UIDrop, 'ui-drop', {attributes, properties});
