import Component, { html, css } from '../script/Component.js';
import { clear } from '../script/DOM.js';
import UITabsItem from './tabs-item.js';

const style = css`
  :host {
    display: block;
    font-family: var(--font);
  }

  #root > input[type="radio"] {
    display: none;
  }

  #links {
    box-sizing: border-box;
    font-size: 0;
    font-weight: 100;
    outline: none;
    border-radius: var(--radius, 0);
    margin-bottom: 0.4em;
    padding: var(--padding-tabs, 0);
    border-bottom: 2px solid var(--color-edge);
  }

  #links > label {
    display: inline-block;
    font-size: 20px;
    vertical-align: bottom;
    padding: 8px 24px;
    cursor: pointer;
    margin-bottom: -2px;
  }

  #links > label:hover {
    color: var(--color-primary);
  }

  #links > label.selected {
    background: var(--background-panel);
    border-bottom: 2px solid var(--color-edge-accent);
    padding-bottom: 6px;
    box-shadow: 0px 1px 18px 0px rgba(0,0,0,0.12);
    z-index: 1;
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
        <div id="root"><div id="links"></div></div>
        <slot></slot>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UITabs} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const root = node.querySelector('#root');
      const links = root.querySelector('#links');

      node.addEventListener('slotchange', () => {
        clear(links);

        const tabs = node.querySelector('slot').assignedNodes().filter(e => e.caption);
        tabs.forEach(item => {
          const caption = item.name || item.caption;
          const radio = createRadio(caption);
          const label = createLabel(caption, item.caption);

          root.insertBefore(radio, root.firstChild);
          links.appendChild(label);

          radio.addEventListener('change', () => this.select(caption));
        });

        this.select();
      });
      return this;
    }

  /** */
    select(name) {
      const node = this.shadowRoot;
      const links = node.querySelector('#links');
      const tabs  = node.querySelector('slot').assignedNodes().filter(e => e.caption);

      const index = tabs.findIndex(e => e.classList.contains('selected'));
      const selected = index === -1 ? 0 : index;

      const tab = changeTab(links, tabs, name, selected);
      if (tab) {
        tabs[selected].event('select', { show: false })
        tab.event('select', { show: true });
        this.event('change', { tab: tabs[tab], index: tab });
      }
    }
  }

Component.init(UITabs, 'ui-tabs', { attributes, properties });

// #region [Private]
/** */
  function changeTab(links, tabs, name, selected) {
    if (!tabs[selected]) return;
    if (!name) name = tabs[selected].name || tabs[selected].caption;

    const selector = `[for="tab-${name.replace(/\s+/, '-')}"]`;
    const caption = tabs[selected].name || tabs[selected].caption;

    const link = links.querySelector(selector);
    const tab = tabs.findIndex(e => (e.name || e.caption) === name);

    const a = onceClass([...links.children], link, 'selected');
    const b = onceClass(tabs, tabs[tab], 'selected');

    if (a && b && name !== caption) return tabs[tab];
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

    if (!item) return false;
    item.classList.add(...classNames);
    return true;
  }
// #endregion
