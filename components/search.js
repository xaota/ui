import Component, {html, css}    from '../script/Component.js';
import {updateChildrenAttribute} from '../script/DOM.js';
import UIInput from './input.js';

const style = css`
  :host {
    display: inline-block;
  }
  ui-input {
    width: 100%;
  }`;

const attributes = {
  /** */
  value(root, value) { updateChildrenAttribute(root, 'ui-input', 'value', value) },
  /** */
    placeholder(root, value) { updateChildrenAttribute(root, 'ui-input', 'placeholder', value) }
  }
const properties = {
  /** */
    disabled(root, value) { updateChildrenAttribute(root, 'ui-input', 'disabled', value) },
  /** */
        fold(root, value) { updateChildrenAttribute(root, 'ui-input', 'fold', value) },
  /** */
        right(root, value) { updateChildrenAttribute(root, 'ui-input', 'right', value) }
  }

/** {UISearch} @class
  * @description Отображение Поисковой строки
  */
  export default class UISearch extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-input icon="search"><slot></slot></ui-input>
      </template>`;

  /** Создание компонента {UISearch} @constructor
    * @param {string?} label содержимое элемента
    */
    constructor(label) {
      super();
      if (label) this.innerText = label;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UISearch} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const input = node.querySelector('ui-input');
      input.addEventListener('input', _ => this.value = input.value);
      return this;
    }
  }

Component.init(UISearch, 'ui-search', {attributes, properties});
