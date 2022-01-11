import Component, { html, css } from '../script/Component.js';
import { clear } from '../script/DOM.js';
import UIButton from './button.js';
import UIIcon from './icon.js';

const attributes = {
  pages(node, value) {
    const pages = parseInt(value) || 0;
    createContent.call(this, node, pages, this.current);
  },
  current(node, value) {
    const pages = parseInt(this.pages) || 0;
    const current = parseInt(value) || 1;
    createContent.call(this, node, pages, value);
  }
};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  #root {
    text-align: center;
  }
  #root > ui-icon {
    position: relative;
    bottom: -0.5em;
    margin-left: 0.2em;
    margin-right: 0.2em;
  }
  #root > ui-button {
    transform: scale(0.8);
    margin-left: 0.05em;
    margin-right: 0.05em;
  }`;

/** Pagination {UIPagination} @class @ui @component <ui-pagination />
  * Пагинация по страничным данным
  */
  export default class UIPagination extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div id="root"></div>
      </template>`;

  /** Создание компонента {UIPagination} @constructor
    * @param {number} pages общее количество страниц
    * @param {number} [current] текущая страница
    * @attention нумерация страниц начинается с 1
    */
    constructor(pages, current) {
      super();
      if (pages)   this.pages = pages;
      if (current) this.current = current;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIPagination} #this текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }
  }

Component.init(UIPagination, 'ui-pagination', { attributes, properties });

// #region [Private]
function createContent(node, pages, current) {
  if (pages < 2) return; // всего одна страница -> пагинация не нужна

  const root = node.getElementById('root');
  if (!root) return;

  current = getCurrent(current);
  const buttons = createButtons(pages, current, page => this.event('change', { page }));

  clear(root);
  buttons.forEach(b => root.appendChild(b));
}

function createButtons(length, current, callback) {
  // выбираем страницы, кнопки которых будут показаны
  const creating = length < 10 ? () => true : () => false;
  const pages = Array.from({ length }, creating); // если страниц больше 10 -> сначала все скрыты
  pages[0] = true; // показ первой страницы
  pages[length - 1] = true; // показ последней страницы
  pages[current] = true; // показ текущей страницы
  if (current < length - 1) pages[current + 1] = true; // показ следующей страницы
  if (current > 0) pages[current - 1] = true; // показ предыдущей страницы

  // создание кнопок для рендеринга
  const buttons = new Array();
  let skip = 0;
  pages.forEach((show, index) => {
    if (!show) {
      ++skip;
      return;
    }
    if (skip > 0) {
      if (skip > 2) {
        buttons.push(new UIIcon('more_horiz'));
      } else {
        // если пропущено не более 2х страниц - покажем их
        while (skip--) {
          const label = index - skip;
          const button = new UIButton({ text: 'outline', label });
          button.addEventListener('click', () => callback(label));
          buttons.push(button);
        }
      }
    }

    skip = 0;
    const mode = index === current ? 'primary' : '';
    const disabled = index === current;
    const label = index + 1;
    const button = new UIButton({ text: 'outline', label, mode, disabled });
    if (!disabled) button.addEventListener('click', () => callback(label));
    buttons.push(button);
  });

  return buttons;
}

function getCurrent(value) {
  return (value || 1) - 1;
}
// #endregion
