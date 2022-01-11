import Component, { html, css, url } from '../script/Component.js';
import { updateChildrenText } from '../script/DOM.js';

const attributes = {
  /** / icon */
    icon(root, value) { updateChildrenText(root, 'ui-icon', value); },

  /** / caption */
    caption(root, value) { updateChildrenText(root, 'p', value); },

  /** / mode */
    mode() {}
};
const properties = {};

const style = css`
  @import "${url('../style/color.css', import.meta.url)}";
  :host {
    display: inline-block;
    margin-inline: 0.8em;
  }
  :host([mode]) ui-icon, :host([mode]) slot {
    color: var(--fill-static);
  }
  p {
    font-size: 0.8em;
    color: var(--color-divider);
  }
  ui-icon {
    margin-bottom: -2px;
  }
  ui-icon:empty {
    display: none;
  }
  slot {
    font-size: 1.6em;
  }`;

/** Statistic {UIStatistic} @class @ui @component <ui-statistic />
  * Компонент для отображения покзателя статистической информации
  */
  export default class UIStatistic extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <p></p>
        <ui-icon></ui-icon>
        <slot></slot>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIStatistic} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      return this;
    }
  }

Component.init(UIStatistic, 'ui-statistic', { attributes, properties });
