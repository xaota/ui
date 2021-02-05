import Component, {html, css} from '../script/Component.js';

const style = css`
  :host {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas:". avatar ."
                        ". content ."
                        ". markup .";
    justify-items: center;
    align-items: end;
    grid-column-gap: 1em;
    grid-row-gap: 2px;

    --background-color: var(--background-panel); /* --color-default-light */
  }

  :host([left]) {
    grid-template-areas:"avatar content ."
                        ". markup .";
    grid-template-columns: fit-content(48px) fit-content(80%) auto;
    justify-items: start;
  }
  :host([right]) {
    grid-template-areas:". content avatar"
                        ". markup .";
    grid-template-columns: auto fit-content(80%) fit-content(48px);
    justify-items: end;
  }

  slot {
    font-family: var(--font);
    display: block;
    /* max-width: 80%; */
  }

  slot:not([name]) {
    display: inline-block;
    grid-area: content;
    background: var(--background-color);
    border: 1px solid var(--background-dark);
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
    position: relative;
    border-radius: .4em;
    padding: 1em;
    /* max-width: 100%; */
  }

  :host([left]) slot:not([name]):after, :host([right]) slot:not([name]):after {
    /* content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 16px solid transparent;
    border-right-color: var(--color-default-light);
    border-left: 0;
    border-bottom: 0;
    margin-top: -8px;
    margin-left: -16px; */
    background-color: var(--background-color);
    /* #F2F2F2; */
    content: "\00a0";
    display: block;
    height: 8px;
    position: absolute;
    bottom: 11px;
    transform: rotate(45deg) skew(-0);
    width:  8px;
  }

  :host([left]) slot:not([name]):after {
    box-shadow: -2px 2px 2px 0 rgba( 178, 178, 178, .4 );
    left: -4px;
  }

  :host([right]) slot:not([name]):after {
    box-shadow: 2px -2px 2px 0 rgba( 178, 178, 178, .4 );
    right: -4px;
  }

  slot[name="avatar"] {
    display: block;
    grid-area: avatar;
    /* width: 0; */
  }

  slot[name="markup"] {
    display: inline-block;
    grid-area: markup;
    width: 100%;
  }

  slot[name="markup"]::slotted(*) {
    width: 100%;
  }

  slot[name="markup"]::slotted(ui-text) {
    text-align: center;
  }`;

const attributes = {}
const properties = {
  left() {},
  right() {},
}

/** {UIMessage} @class
  * @description Отображение сообщения
  */
  export default class UIMessage extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot name="avatar"></slot>
        <slot></slot>
        <slot name="markup"></slot>
      </template>`;

  /** Создание компонента {UIMessage} @constructor
    * @param {string?} side сторона показа сообщения (left / right)
    */
    constructor(side) {
      super();
      if (side) this[side] = true;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIMessage} текущий компонент
    */
    mount(node) {
      return super.mount(node, attributes, properties);
    }

  /** */
    content(...nodes) {
      nodes = nodes.map(toDOMelement);
      nodes.forEach(node => this.appendChild(node));
      return this;
    }

  /** */
    avatar() {
      return this;
    }

  /** */
    markup(...nodes) {
      nodes = nodes.map(toDOMelement);
      nodes.forEach(node => node.setAttribute('slot', 'markup'));
      nodes.forEach(node => this.appendChild(node));
      return this;
    }
  }

Component.init(UIMessage, 'ui-message', {attributes, properties});

// #region [Private]
/** / toDOMelement */
  function toDOMelement(node) {
    return typeof node !== 'object' || !('nodeType' in node)
      ? document.createTextNode(node)
      : node;
  }
// #endregion
