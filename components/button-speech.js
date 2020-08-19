import Component, {html, css} from '../script/Component.js';
import UIButton from './button.js';
import UIIcon   from './icon.js';
import {updateChildrenAttribute, updateChildrenProperty, updateChildrenText} from '../script/DOM.js';

const toggle = Symbol('toggle');
const start  = Symbol('start');
const stop   = Symbol('stop');

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
      const icon = disabled ? 'volume_off' : 'volume_up';
      updateChildrenText(root, 'ui-button-icon', icon);
      updateChildrenProperty(root, 'ui-button-icon', 'disabled', disabled);
    }
  }

/** {UIButtonSpeech} @class
  * @description Отображение блока простого текста
  */
  export default class UIButtonSpeech extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <ui-button-icon text="outline">volume_up</ui-button-icon>
      </template>`;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {Component} @this {UIButtonSpeech} текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      if (!('speechSynthesis' in window)) {
        this.disabled = true;
        return this;
      }
      const button = node.querySelector('ui-button-icon');
      button.addEventListener('click', _ => {
        this[toggle]();
        // this.event('change');
      });
      return this;
    }

  /** */
    [toggle] = () => {
      const text = this.value;
      if (!text) return;
      if (!this.active) return this[start](text);
      // todo: queue
    }

  /** */
    [start] = text => {
      // eslint-disable-next-line no-undef
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = text;
      utterance.lang = 'ru-RU';
      utterance.volume = 1;
      utterance.rate = 1;
      utterance.pitch = 1;
      const voices = window.speechSynthesis.getVoices();
      utterance.voice = voices.filter(voice => voice.default === true)[0]; // + .lang, + .localService
      // mark (ssml)

      utterance.onend = this[stop];
      window.speechSynthesis.speak(utterance);

      this.active = true;
    }

  /** */
    [stop] = () => {
      this.active = false;
    }
  }

Component.init(UIButtonSpeech, 'ui-button-speech', {attributes, properties});
