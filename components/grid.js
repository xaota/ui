import Component, { html, css } from '../script/Component.js';
import { cssVariable } from '../script/DOM.js';

const attributes = {
  /** / columns */
    columns(root, value) {
      const temp = value.replace(/\s+/g, '');
      const valid = /^(\d+-)+\d$/.test(temp);
      const data = valid
        ? temp.split('-').map(e => e + 'fr').join(' ')
        : 'initial';
      cssVariable('slot', 'grid-columns', data, root);
    }
  };
const properties = {};

const style = css`
  :host {
    --grid-padding-default: 40px;

    --grid-width: auto;
    --grid-height: auto;
    --grid-gap: 4px;
    --grid-columns: 1fr;
    --grid-padding: var(--grid-padding-default);
  }
  :host([thin]) {
    --grid-padding: 0;
  }
  :host([thin="top"]) {
    --grid-padding-top: 0;
    --grid-padding: var(--grid-padding-default);
  }
  :host([thin="bottom"]) {
    --grid-padding-bottom: 0;
    --grid-padding: var(--grid-padding-default);
  }
  :host, main {
    display: block;
  }
  main {
    margin: 0 auto;
  }
  slot {
    display: grid;
    margin: 0 auto;
    width: var(--grid-width);
    height: var(--grid-height);
    padding-top: var(--grid-padding-top, var(--grid-padding));
    padding-bottom: var(--grid-padding-bottom, var(--grid-padding));
    gap: var(--grid-gap);
    grid-template-columns: var(--grid-columns);
  }`;

/** Grid {UIGrid} @class @ui @component <ui-grid />
  * Разделение блоков по сетке
  */
  export default class UIGrid extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <main><slot></slot></main>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIGrid} #this текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIGrid, 'ui-grid', { attributes, properties });
