import Component, { html, css } from '../script/Component.js';
import UIButtonIcon from './button-icon.js';
import { updateChildrenAttribute, updateChildrenProperty, updateChildrenText } from '../script/DOM.js';

const toggle      = Symbol('toggle');
const start       = Symbol('start');
const stop        = Symbol('stop');
const result      = Symbol('result');
const recognition = Symbol('recognition');

const style = css`
  :host {
    display: inline-block;
  }

  ui-button-icon {
    width: 100%;
  }`;

const attributes = {
  /** */
    active(root, value) {
      value = [true, ''].includes(value) ? null : 'outline';
      updateChildrenAttribute(root, 'ui-button-icon', 'text', value);
    },

  /** */
    mode(root, value) { updateChildrenAttribute(root, 'ui-button-icon', 'mode', value) }
  }
const properties = {
  /** */
    disabled(root, value) {
      const disabled = [true, ''].includes(value);
      const icon = disabled ? 'mic_off' : 'keyboard_voice';
      updateChildrenText(root, 'ui-button-icon', icon);
      updateChildrenProperty(root, 'ui-button-icon', 'disabled', disabled);
    }
  }

/** {UIButtonVoice} @class
  * @description Отображение блока простого текста
  */
  export default class UIButtonVoice extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-button-icon text="outline">keyboard_voice</ui-button-icon>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIButtonVoice} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      const button = node.querySelector('ui-button-icon');

      button.addEventListener('click', _ => {
        this[toggle]();
        // this.event('change');
      });
      return this;
    }

  /** */
  [recognition] = null;

  /** */
    [toggle] = () => {
      this.active
        ? this[stop]()
        : this[start]();
    }

  /** */
    [start] = () => {
      // eslint-disable-next-line no-undef
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onstart = () => {};
      recognition.onerror = e => { console.error(e); this[stop](); };
      recognition.onend = () => {};
      recognition.onresult = this[result];
      recognition.lang = 'ru-RU';
      recognition.start();

      this[recognition] = recognition;
      this.active = true;
    }

  /** */
    [stop] = () => {
      if (this[recognition]) this[recognition].stop();
      this[recognition] = null;
      this.active = false;
    }

  /** */
    [result] = event => {
      if (!event.results === undefined) return this[stop]();

      let text;
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          text = event.results[i][0].transcript;
          this[stop]();
          break;
        } else {
          text = [...event.results].map(e => e[0].transcript).join(' ');
        }
      }
      this.event('recognize', { text });
    }
  }

Component.init(UIButtonVoice, 'ui-button-voice', { attributes, properties });
