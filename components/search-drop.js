import Component, {html, css} from '../script/Component.js';
import {updateChildrenAttribute, updateChildrenText} from '../script/DOM.js';

import UIInput    from './input.js';
import UIDrop     from './drop.js';
import UIList     from './list.js';
import UIListItem from './list-item.js';

const style = css`
  :host {
    display: inline-block;
  }
  ui-search {
    width: 100%;
  }`;

const attributes = {
  label(root, value) { updateChildrenText(root, 'ui-search', value) }
}
const properties = {
  right(root, value) { updateChildrenAttribute(root, 'ui-search', 'right', value) }
}

/** {UISearchDrop} @class
  * @description Отображение блока простого текста
  */
  export default class UISearchDrop extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-drop y="top" outset>
          <ui-search></ui-search>
          <ui-list slot="drop">
            <slot></slot>
          </ui-list>
        </ui-drop>
      </template>`;

  /** Создание компонента {UISearchDrop} @constructor
    * @param {string} label название поля в UI
    */
    constructor(label) {
      super();
      if (label) this.label = label;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UISearchDrop} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const input = node.querySelector('ui-search');
      this.addEventListener('click-ListItem', event => {
        const text = event.target.innerText;
        input.value = text;
      });

      return this;
    }
  }

Component.init(UISearchDrop, 'ui-search-drop', {attributes, properties});
