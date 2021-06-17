import Component, { html, css } from '../script/Component.js';
import { updateChildrenText } from '../script/DOM.js';
import Deferred from 'javascript-toolbox/library/Deferred.js';
import UIButton  from './button.js';
// eslint-disable-next-line no-unused-vars
import UICaption from './caption.js';

const style = css`
  :host {
    display: inline-block;
    min-width: 320px;
    background: var(--background-panel);
    box-sizing: border-box;
    box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12);
    border-radius: 4px;

    max-width: 90%;
  }

  :host(.animated) {
    margin: auto;
    transition: 0.4s ease transform, 0.4s ease opacity;
    transform: translateY(-3vh);
  }

  ui-caption {
    display: block;
  }

  ui-caption:not(:empty) {
    padding: 24px;
    padding-bottom: 20px;
  }

  slot:not([name]) {
    display: block;
  }

  slot:not([name])::slotted(ui-text) {
    padding: 24px;
    padding-top: 0;
  }

  slot[name="action"] {
    display: flex;
    flex-direction: row-reverse;
    padding: 0 4px 8px;
  }

  slot[name="action"]::slotted(*) {
    display: none;
  }

  slot[name="action"]::slotted(ui-button) {
    display: inline-block;
  }`;

const attributes = {
  /** / caption */
    caption(root, value) { updateChildrenText(root, 'ui-caption', value) }
  }
const properties = {}

/** {UIDialog} Диалоговое окно @class @extends {Component}
  * @description Отображение блока простого текста
  */
  export default class UIDialog extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-caption></ui-caption>
        <slot></slot>
        <slot name="action"></slot>
      </template>`;

  /** Создание компонента {UIDialog} @constructor
    * @param {string} caption название диалогового окна
    */
    constructor(caption) {
      super();
      if (caption !== undefined) this.caption = caption;
      this.settings = {};
      this.cache = {};
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIDialog} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }

  /** */
    content(content) {
      this.appendChild(content);
      return this;
    }

  /** */
    action(label, callback) {
      const button = new UIButton({ label, mode: 'primary', text: '' });
      button.addEventListener('click', callback.bind(this), false);
      button.slot = 'action';
      this.appendChild(button);
      return this;
    }

  /** */
    open(callback, z = 100, root = document.body) {
      this.cache.root = root;
      this.cache.z = z;

      this.promise = new Deferred();

      this.splash = document.createElement('div'); // #ui-popup-splash
      const style = {
        display: 'flex',
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: z,
        backgroundColor: 'rgba(0,0,0, 0.5)'
        // backdropFilter: blur(2px)
      };

      Object.keys(style).forEach(key => this.splash.style[key] = style[key]);

      // this.style.width = '400px';
      this.classList.add('animated');
      root.appendChild(this.splash);
      this.splash.appendChild(this);

      if (this.settings.scroll === false) {
        this.cache.scroll = getComputedStyle(root).overflow;
        root.style.overflow = 'hidden';
      }

      const init = () => callback.call(this, this.shadowRoot);
      if (callback) this.addEventListener('transitionend', _ => setTimeout(init, 50), { once: true });
      return this.promise;
    }

  /** */
    close() {
      let restore = false;

      const restoreRootView = () => {
        if (restore) return;
        if (this.splash) this.splash.remove();
        if (this.settings.scroll === false) this.cache.root.style.overflow = this.cache.scroll;
        this.remove();
        restore = true;
      }

      this.addEventListener('transitionend', restoreRootView);
      setTimeout(restoreRootView, 500);

      this.style.opacity = 0;
      this.style.transform = 'translateY(0)';
    }

  /** */
    options(options) {
      Object.assign(this.settings, options);
      return this;
    }

  /** */
    resolve(data, close) {
      if (this.promise) this.promise.resolve(data);
      if (close) this.close();
      return this;
    }

  /** */
    reject(data, close) {
      if (this.promise) this.promise.reject(data);
      if (close) this.close();
      return this;
    }
  }

Component.init(UIDialog, 'ui-dialog', { attributes, properties });
