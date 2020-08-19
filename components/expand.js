import Component, {html, css} from '../script/Component.js';
import {updateChildrenClass, updateChildrenText} from '../script/DOM.js';

const style = css`
  :host {
    display: block;
  }
  div.root {
    background: #fff;
    border: 1px solid #eee;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
  }
  header {
    display: flex;
    justify-content: space-between;
    position: relative;
    cursor: default;
  }
  header > p {
    display: inline-block;
    white-space: nowrap;
    padding: 0 1em;
  }
  header p.summary {
    color: black;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  header p.description {
    color: gray;
    margin-right: 2em;
  }
  header:after {
    content: url('../../icons/light/keyboard_arrow_down.svg');
    position: absolute;
    right: 1em;
    top: 1em;
    cursor: pointer;
    color: black;
  }
  div.root.expand header:after {
    content: url('../../icons/light/keyboard_arrow_up.svg');
  }
  slot {
    display: block;
    color: black;
    padding: 0 1em;
    background-color: white;
    height: 0;
    overflow: hidden;
    transition: transform 0.2s ease-out, padding 0.2s ease-in;
    transform: scaleY(0);
    transform-origin: top;
  }
  div.root.expand > slot {
    padding: 1em;
    transform: scaleY(1);
    height: auto;
    overflow: visible;
  }`;

const attributes = {
  summary(root, value) { updateChildrenText(root, 'header > p.summary', (value || '').trim().split('\n')[0]) },
  description(root, value) { updateChildrenText(root, 'header > p.description', (value || '').trim().split('\n')[0]) }
}
const properties = {
  expand
}

/** {UIExpand} @class
  * @description Отображение блока простого текста
  */
  export default class UIExpand extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div class="root">
          <header>
            <p class="summary"></p>
            <p class="description"></p>
          </header>
          <slot></slot>
        </div>
      </template>`;

  /** Создание компонента {UIExpand} @constructor
    * @param {string?} text содержимое элемента
    */
    constructor(text) {
      super();
      if (text) this.innerText = text;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIExpand} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const root = node.querySelector('div.root');
      root.querySelector('header').addEventListener('click', event => {
        this.expand = !this.expand;
        event.stopPropagation();
        event.cancelBubble = true;
        event.preventDefault();
        return false;
      });
      return this;
    }
  }

Component.init(UIExpand, 'ui-expand', {attributes, properties});

// #region [Private]
/** */
  function expand(root, value) {
    updateChildrenClass(root, 'div.root', {expand: value === ''});

    const expanded = this.expand;
    this.event('expand', {expanded});
    this.event(expanded ? 'unfold' : 'fold');
  }
// #endregion
