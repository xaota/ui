import Component, { html, css } from '../script/Component.js';
import UIButton from './button.js';
import { updateChildrenAttribute, updateChildrenProperty } from '../script/DOM.js';

const style = css`
  :host, slot {
    display: inline-block;
  }

  ui-button {
    width: 100%;
  }

  label {
    padding: 0;
    margin: 0;
    display: block;
    box-sizing: border-box;
    font-size: 1em;
  }

  ::slotted(ui-icon) {
    margin-top:    -0.6em;
    margin-bottom: -0.4em;
  }

  ::slotted(ui-icon:not(:only-child):first-child) {
    margin-right: 0.3em;
    margin-left: -0.6em;
  }

  ::slotted(ui-icon:not(:only-child):last-child) {
    margin-left: 0.3em;
    margin-right: -0.6em;
  }

  ::slotted(ui-icon:only-child) {
    margin-left: -1.2em;
    margin-right: -1.2em;
  }`;

const attributes = {
  /** */
    text(root, value) { updateChildrenAttribute(root, 'ui-button',  'text',     value) },
  /** */
    mode(root, value) { updateChildrenAttribute(root, 'ui-button',  'mode',     value) },
  /** */
    accept(root, value) { updateChildrenAttribute(root, 'input[type="file"]', 'accept', value) }

  }
const properties = {
  /** */
    disabled(root, value) { updateChildrenProperty(root, 'ui-button',  'disabled', value) },
  /** */
    multiple(root, value) { updateChildrenProperty(root, 'input[type="file"]', 'multiple', value) }
  }

const types = { buffer, binary, data, text };

/** {UIButtonUpload} @class
  * @description Отображение блока простого текста
  */
  export default class UIButtonUpload extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-button>
          <label>
            <input type="file" hidden />
            <slot></slot>
          </label>
        </ui-button>
      </template>`;

  /** Создание компонента {UIButtonUpload} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** / files @readonly */
    get files() {
      const root = this.shadowRoot;
      /** @type {HTMLInputElement} */
      const input = root.querySelector('input[type="file"]');
      return input && input.files || [];
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIButtonUpload} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      /** @type {HTMLInputElement} */
      const input = node.querySelector('input[type="file"]');
      input.addEventListener('change', e => {
        const files = [...input.files];
        this.event('change', files);
        files.forEach(async file => {
          const value = await read(file);
          this.event('file', value);
        });
      });
      return this;
    }
  }

Component.init(UIButtonUpload, 'ui-button-upload', { attributes, properties });

// #region [Private]
/** / read */
  function read(file, type = 'text') {
    return new Promise((resolve, reject) => {
      const fr  = new FileReader();

      fr.onload = async event => { // onload fires after reading is complete
        const reader = event.target;
        if (reader.readyState !== FileReader.DONE) reject(); // !
        try {
          const data = await types[type](reader);
          resolve({ data, name: file.name });
        } catch (error) {
          reject(error);
        }
      }

      switch (type) {
        case 'buffer': fr.readAsArrayBuffer(file);  break;
        case 'binary': fr.readAsBinaryString(file); break;
        case 'data'  : fr.readAsDataURL(file);      break;
        case 'text'  : fr.readAsText(file);         break;
      }
    });
  }

/** */
  function text(reader) {
    return new Promise((resolve, reject) => {
      resolve(reader.result);
    });
  }

/** */
  function binary(reader) {

  }

/** */
  function buffer(reader) {

  }

/** */
  function data(reader) {

  }
// #endregion
