import Component, { html, css } from '../script/Component.js';
import UIPaper    from './paper.js';
import UIDrop     from './drop.js';
import UITabs     from './tabs.js';
import UITabsItem from './tabs-item.js';

const style = css`
  :host {
    display: inline-block;
    --duration: .2s;
    --size: 200px;
    --radius: 2px;
    --contrast: 1px;

    --stroke-static: var(--color-details);
    --stroke-active: var(--color-details-dark);
    --stroke-ripple: var(--color-text-lighten);
    --fill-ripple:   var(--color-details-light);

    vertical-align: bottom;
  }

  div.root {
    box-sizing: border-box;
    user-select: none;
    font: normal 1em / normal Tahoma, sans-serif;
    transition: 0.3s all ease;
    position: relative;
    overflow: hidden;
    outline: none;
    padding: 0;
    border-bottom: 1px solid var(--stroke-static);
  }

  div.root:hover {
    border-bottom-color: var(--stroke-ripple);
  }

  div.root:focus-within {
    border-bottom-color: var(--stroke-active);
  }

  div.root > input {
    box-sizing: border-box;
    outline: none;
    display: block;
    width: 100%;
    margin: 0;
    padding: 1.2em 0.6em;
    background: none;
    border: none;
    font: normal 1em / normal Tahoma, sans-serif;
    transition: 0.2s all ease;
  }

  div.root > input:focus, div.root > input:valid {
    padding: 1.5em 0.6em 0.9em;
  }

  div.root > input + label {
    position: absolute;
    color: gray;
    left: 0.6em;
    pointer-events: none;
    transition: 0.2s all ease;
    top: 1.5em;
    font: normal 1em / normal Tahoma, sans-serif;
  }

  div.root > input:focus + label, div.root > input:valid + label {
    font-size: .8em;
    color: var(--stroke-active);
    top: .2em;
  }

  div.root:before {
    content: '';
    position: absolute;
    display: block;
    height: 1.5em;
    width: 1.5em;
    top: 1.4em;
    background: var(--stroke-active);
    pointer-events: none;
  }

  :host(:not([right])) div.root:before {
    left: 0.3em;
  }
  :host(:not([right])) div.root > input {
    padding-left: 2em;
  }
  :host(:not([right])) div.root > input + label {
    left: 2.3em;
  }

  :host([right]) div.root:before {
    right: 0.3em;
  }
  :host([right]) div.root > input {
    padding-right: 2em;
  }

  :host([fold]) div.root > input:not(:valid) {
    width: 0;
  }
  :host([fold]) div.root > input:focus {
    width: 100%;
  }
  :host([fold]) div.root > input:not(:focus):not(:valid) + label {
    display: none;
  }

  div.ripple {
    background: var(--fill-ripple);
    position: absolute;
    border-radius: 50%;
    width: 0;
    height: 0;
    transition: var(--duration) all ease-in;
    transform: translate(-50%, -50%);
  }

  div.ripple.run {
    width: var(--size);
    height: var(--size);
    background-color: var(--fill-static);
  }

  slot {
    display: block;
    position: relative;
  }

  /* div.root:before, */
  div.root:after {
    content: '';
    position: absolute;
    display: block;
    height: 0;
    width: 0;
    bottom: 0;
    left: 50%;
    border: 1px solid var(--stroke-active);
    border-left: none;
    border-right: none;
    transition: .2s width ease, .2s left ease;
  }

  div.root:focus-within:after {
    left: 0;
    width: 100%;
  }

  ui-drop {
    min-width: 230px;
  }`;

const attributes = {}
const properties = {}

/** {UIInputColor} @class
  * @description Отображение поля выбора цвета
  */
  export default class UIInputColor extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-drop outset y="top" action>
          <!-- todo: ui-input -->
          <div class="root">
            <input required />
            <label><slot></slot></label>
          </div>

          <div slot="drop">
            <ui-tabs>
              <ui-tabs-item caption="палитра" name="palette" class="selected">
                <ui-paper>
                  content 1
                </ui-paper>
              </ui-tabs-item>

              <ui-tabs-item caption="схема" name="scheme">
                <ui-paper>
                  <input type="color" />
                </ui-paper>
              </ui-tabs-item>
            </ui-tabs>

            <ui-button id="change">закрыть</ui-button>
          </div>
        </ui-drop>
      </template>`;

  /** Создание компонента {UIInputColor} @constructor
    * @param {string?} label название элемента
    */
    constructor(label) {
      super();
      if (label) this.innerText = label;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIInputColor} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      /** @type UIDrop */
      const drop = node.querySelector('ui-drop');
      const change = node.querySelector('#change');

      change.addEventListener('click', () => drop.close());
      return this;
    }
  }

Component.init(UIInputColor, 'ui-input-color', { attributes, properties });
