import Component, {html, css} from '../script/Component.js';
import {updateChildrenText} from '../script/DOM.js';

import UIInput    from './input.js';
import UIDrop     from './drop.js';
import UIDropRoot from './drop-root.js';
import UIList     from './list.js';
import UIListItem from './list-item.js';

const style = css`
  :host {
    display: inline-block;
  }

  ui-drop-root {
    display: block;
  }

  ui-input {
    width: 100%;
  }`;

const attributes = {
  value() {},
  label(root, value) { updateChildrenText(root, 'ui-input', value) }
}
const properties = {}

/** {UISelect} @class
  * @description Отображение блока простого текста
  */
  export default class UISelect extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-drop-root>
          <ui-input></ui-input>
          <ui-list slot="drop">
            <slot></slot>
          </ui-list>
        </ui-drop-root>
      </template>`;

  // /** Создание компонента {UISelect} @constructor
  //   */
  //   constructor() {
  //     super();
  //   }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UISelect} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const input = node.querySelector('ui-input');
      const list  = node.querySelector('ui-list');
      // console.log(input);
      // console.log(shadow, input, attribute, previous, current);
      // if (!input) return; //
      input.innerHTML = this.label;

      list.addEventListener('click', event => {
        const path = event.composedPath();
        const item = path
          .slice(0, path.indexOf(list))
          .filter(e => UIListItem.is(e))
          .reverse()[0];
        if (!item) return;
        const text = item.innerText;

        input.value = text;
        this.setAttribute('value', item.value || text);
        this.event('change');
      });
      return this;
    }
  }

Component.init(UISelect, 'ui-select', {attributes, properties});
