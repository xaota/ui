import Component, { html, css } from '../script/Component.js';
import $, { clear, $$ }         from '../script/DOM.js';
import UIPipeline             from './pipeline.js';
import UIBrick                from './brick.js';

const attributes = {
  stage(root, value) {
    const stages = parseInt(value) || 0;
    const pipelines = parseInt(this.pipeline) || 0;
    manage.call(this, root, { pipelines, stages });
  },

  pipeline(root, value) {
    const stages = parseInt(this.stage) || 0;
    const pipelines = parseInt(value) || 0;
    manage.call(this, root, { pipelines, stages });
  }
};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  slot {
    display: none;
  }`;

/** Plotline {UIPlotline} @class @ui @component <ui-plotline />
  * Канва сюжета
  */
  export default class UIPlotline extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <div></div>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIPlotline} @constructor
    // * @param {}
    */
    constructor() {
      super();
      // this.store({});
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIPlotline} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      // const {} = this.store();
      const slot = $('slot', node);
      slot.addEventListener('slotchange', () => manageBricks.call(this, node));
      return this;
    }
  }

Component.init(UIPlotline, 'ui-plotline', { attributes, properties });

/// #region [Private]
function manage(root, { pipelines, stages }) {
  const div = $('div', root);
  if (!div) return;
  clear(div);

  for (let i = 1; i <= pipelines; ++i) {
    const pipeline = new UIPipeline();
    pipeline.setAttribute('index', i.toString()); // !
    pipeline.stage = stages;
    div.appendChild(pipeline);
  }
  manageBricks.call(this, root);
}

function manageBricks(node) {
  const slot = $('slot', node);
  const div  = $('div', node);
  if (!slot || !div) return;

  $$('ui-pipeline', div)
    .forEach(pipeline => clear(pipeline));

  const bricks = slot
    .assignedElements()
    .filter(e => UIBrick.is(e));

  if (!bricks.length) return;

  bricks.forEach(brick => {
    const pipeline = brick.getAttribute('pipeline');
    if (!pipeline) return;
    const root = $(`ui-pipeline[index="${pipeline}"]`, div);
    if (!root) return;

    const e = brick.cloneNode(true);
    root.appendChild(e);
  });
}
// #endregion
