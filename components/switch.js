import Component, { html, css } from '../script/Component.js';
import { updateChildrenProperty, updateChildrenElement, updateChildrenText } from '../script/DOM.js';
import UIText from './text.js';

const style = css`
  :host {
    display: inline-block;
    min-width: var(--width, 66px);
  }

  slot {
    font: var(--font);
    white-space: nowrap;
    font-size: .8em;
    color: var(--stroke-active);
    display: block;
    text-align: center;
  }

  #root {
    position: relative;
    display: flex;
    height: 20px;
    background: #898989;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  label {
    display: block;
    flex: 1 1;
  }

  #slider {
    position: absolute;
    display: flex;
    height: 16px;
    border-radius: 100px;
    background: #fff;
    box-shadow: 0px 3px 3px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
    align-items: center;
    justify-content: center;
    font-size: 0.6em;
    padding: 0 1em;
    min-width: 26px;
    box-sizing: border-box;

    top: 2px;
    color: black;
  }
  #slider:not(:empty) {
    width: 50%;
    left: 25%;
  }
  label:active ~ #slider { transform: scale(1.15, 0.85); }

  #negative:checked ~ #root {
    background: #f8c8d4;
  }
  #positive:checked ~ #root {
    background: #6fbeb5;
  }
  #negative:checked ~ #root > #slider {
    left: -2px;
    background: #f48fb1;
  }
  #neutral:checked ~ #root > #slider:empty {
    left: calc(50% - 13px);
  }
  #neutral:checked ~ #root > #slider:not(:empty) {
    left: 25%;
  }
  #positive:checked ~ #root > #slider {
    left: calc(100% - 24px);
    background: #179588;
  }
  #positive:checked ~ #root > #slider:not(:empty) {
    left: calc(50% + 2px);
  }
  #negative:checked ~ #root > #slider, #positive:checked ~ #root > #slider {
    height: 26px;
    top: -3px;
    color: white;
  }
  :host([disabled]) #root {
    background: #d5d5d5 !important;
  }
  :host([disabled]) #slider {
    background: #bcbdbc !important;
  }
  `;

const attributes = {
  negative() {},
  neutral() {},
  positive() {},

  value(root, value) {
    if (!value) return;
    updateChildrenProperty(root, '#' + value, 'checked', true);
    const text = this[value];
    if (!text) return;
    updateChildrenText(root, '#slider', text);
  }
}
const properties = {
  /** */
    disabled(root, value) {
      updateChildrenProperty(root, '#negative', 'disabled', value);
      updateChildrenProperty(root, '#neutral',  'disabled', value);
      updateChildrenProperty(root, '#positive', 'disabled', value);
    }
  }

/** Поле-выключатель @class {UISwitch} @extends {Component}
  * @description Отображение блока простого текста
  */
  export default class UISwitch extends Component {
    static template = html`
      <template>
        <style>${style}</style>

        <ui-text id="label">
          <slot></slot>
        </ui-text>

        <input type="radio" hidden name="switch" id="negative" value="negative" />
        <input type="radio" hidden name="switch" id="neutral"  value="neutral" />
        <input type="radio" hidden name="switch" id="positive" value="positive" />

        <div id="root">
          <label for="negative"></label>
          <label for="neutral"></label>
          <label for="positive"></label>

          <div id="slider"></div>
        </div>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UISwitch} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      const negative = node.getElementById('negative');
      const neutral = node.getElementById('neutral');
      const positive = node.getElementById('positive');

      [negative, neutral, positive].forEach(radio => {
        radio.addEventListener('change', () => {
          if (!radio.checked) return; // !
          this.value = radio.id;
          this.event('change', { value: radio.id });
        });
      });

      if (!this.value) this.value = 'neutral';
      return this;
    }
  }

Component.init(UISwitch, 'ui-switch', { attributes, properties });
