import Component, { html, css } from '../script/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: grid;
    /* box-sizing: border-box; */
    grid-template-areas: 'header header header' 'left actions right' 'footer footer footer';
    grid-template-columns: var(--column-size, '1fr') auto var(--column-size, '1fr');
    gap: 8px;
  }
  header {
    grid-area: header;
  }
  footer {
    grid-area: footer;
  }
  nav {
    grid-area: actions;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }
  aside {}
  #left {
    grid-area: left;
  }
  #right {
    grid-area: right;
  }
  slot {
    display: block;
    height: 100%;
  }
  nav > slot {
    display: contents;
  }`;

/** Split {Split} @class @ui @component <ui-split />
  * Два разденных блока по вертикали или горизонтали
  * Между блоками панель действий
  * Сверху может быть размещен заголовк, снизу легенда
  */
  export default class Split extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <header><slot name="header"></slot></header>
        <aside id="left"><slot name="left"></slot></aside>
        <nav><slot name="actions"></slot></nav>
        <aside id="right"><slot name="right"></slot></aside>
        <footer><slot name="footer"></slot></footer>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Split} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      return this;
    }
  }

Component.init(Split, 'ui-split', { attributes, properties });
