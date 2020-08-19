import Component, {html, css} from '../script/Component.js';
import UITabsItem       from './tabs-item.js';

const style = css`
  :host {
    display: block;
    width: 100%;
    font-family: var(--font);
    /* box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12); */
  }

  div.root > input[type="radio"] {
    display: none;
  }

  #links {
    border: none;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    font-size: 0;
    font-weight: 100;
    outline: none;
    border-radius: var(--radius);
    background: white;
    margin-bottom: 0.4em;
  }

  #links > label {
    display: inline-block;
    font-size: 20px;
    vertical-align: bottom;
    padding: 8px 24px;
    cursor: pointer;
  }

  #links > label.selected {
    background: #f5f5f8;
    border-bottom: 2px solid rgb(221, 97, 39);
    padding-bottom: 6px;
  }

  ::slotted(ui-tabs-item) {
    display: none;
  }

  ::slotted(ui-tabs-item.selected) {
    display: block;
  }`;

const attributes = {}
const properties = {}

/** {UITabs} @class
  * @description Отображение блока простого текста
  */
  export default class UITabs extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div class="root"><div id="links"></div></div>
        <slot></slot>
      </template>`;


  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UITabs} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const root = node.querySelector('div.root');
      const links = root.querySelector('#links');

      const tabs  = node.querySelector('slot').assignedNodes().filter(e => e.caption);
      tabs.forEach(item => {
        const caption = item.name || item.caption;
        const radio = createRadio(caption);
        prepend(root, radio);
        const label = createLabel(caption, item.caption);
        links.appendChild(label);
        // items.appendChild(item.cloneNode(true));
        radio.addEventListener('change', _ => changeTab(links, tabs, caption));
      });

      const selected = tabs.findIndex(e => e.classList.contains('selected'))[0] || 0;
      if (!tabs[selected]) return this;
      const caption = tabs[selected].name || tabs[selected].caption;
      changeTab(links, tabs, caption);
      return this;
    }

  /** */
    select(name) {
      const node = this.shadowRoot;
      const links = node.querySelector('#links');
      const tabs  = node.querySelector('slot').assignedNodes().filter(e => e.caption);
      changeTab(links, tabs, name);
    }
  }

Component.init(UITabs, 'ui-tabs', {attributes, properties});

// #region [Private]
/** */
  function changeTab(links, tabs, caption) {
    const selector = `[for="tab-${caption.replace(/\s+/, '-')}"]`;

    onceClass([...links.children], links.querySelector(selector), 'selected');
    onceClass(tabs,  tabs.filter(e => (e.name || e.caption) === caption)[0], 'selected');
  }

/** */
  function prepend(root, node) {
    return root.insertBefore(node, root.firstChild); // node?
  }

/** */
  function createRadio(caption) {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'tabs';
    input.id   = 'tab-' + caption.replace(/\s+/, '-');
    return input;
  }

/** */
  function createLabel(caption, text) {
    const label = document.createElement('label');
    label.setAttribute('for', 'tab-' + caption.replace(/\s+/, '-'));
    label.innerText = text;
    return label;
  }

/** */
  function onceClass(items, item, ...classNames) {
    items.forEach(node => node.classList.remove(...classNames));
    item.classList.add(...classNames);
  }
// #endregion
