import Component, { html, css } from '../script/Component.js';
import { updateChildrenAttribute } from '../script/DOM.js';

const attributes = {
  avatar(root, value) {}
};
const properties = {};

const style = css`
  :host {
    display: grid;
    grid-template-areas: /* avatar, caption, description, menu, content, common action{1..3} */
      'avatar caption     caption     caption     menu'
      'avatar description description description .'
      '.      content     common      common      more'
      '.      action1     action2     action3     .';
  }
  slot {
    display: block;
  }`;

/** Snippet {UISnippet} @class @ui @component <ui-snippet />
  * Блок с информацией в карточном виде
  */
  export default class UISnippet extends Component {
    static template = html`
      <template>
        <style>${style}</style>

        <ui-avatar></ui-avatar>
        <ui-caption></ui-caption>
        <ui-text></ui-text>
        <ui-drop>
          <ui-icon>more</ui-icon>
          <slot name="menu" slot="drop"></slot>
        </ui-drop>
        <slot></slot>
        <slot name="common"></slot>
        <slot name="more"></slot>
        <slot class="action" name="action1"></slot>
        <slot class="action" name="action2"></slot>
        <slot class="action" name="action3"></slot>
      </template>`;

  /** Создание компонента {UISnippet} @constructor
    * @param {type} store type
    */
    constructor(store) {
      super();
      this.store({ store });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UISnippet} #this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const { store } = this.store();
      return this;
    }
  }

Component.init(UISnippet, 'ui-snippet', { attributes, properties });
