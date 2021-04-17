import Component, { html, css } from '../script/Component.js';
import $, { clear, $$ } from '../script/DOM.js';
import UIPipelineStage from './pipeline-stage.js';
import UIBrick from './brick.js';

const attributes = {
  stage(root, value) {
    const stages = parseInt(value) || 0;
    manage.call(this, root, stages);
  }
};
const properties = {};

const style = css`
  :host {
    display: block;
    position: relative;
  }
  canvas {
    display: block;
    position: absolute;
    top:0;
    bottom:0;
    left: 0;
    right: 0;
    z-index: -1;
  }
  div {
    display: flex;
    justify-content: space-between;
  }
  slot {
    display: none;
  }`;

/** Pipeline {UIPipeline} @class @ui @component <ui-pipeline />
  * Пайплайн
  */
  export default class UIPipeline extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <canvas></canvas>
        <div></div>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIPipeline} @constructor
    * @param {type} store type
    */
    constructor(store) {
      super();
      // this.store({store});
    }

  #resizeObserver = null;

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIPipeline} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);
      // const {store} = this.store();
      const slot = $('slot', node);
      slot.addEventListener('slotchange', () => manageBricks.call(this, node));

      this.#resizeObserver = new ResizeObserver(([element]) => {
        manageConnections.call(this, node)
      });

      this.#resizeObserver.observe(this);
      return this;
    }

    unmount(node) {
      this.#resizeObserver?.unobserve(this);
      return this;
    }
  }

Component.init(UIPipeline, 'ui-pipeline', { attributes, properties });

// #region [Private]
function manage(root, stages) {
  const div = $('div', root);
  if (!div) return;
  clear(div);
  for (let i = 1; i <= stages; ++i) {
    const stage = new UIPipelineStage();
    stage.setAttribute('index', i.toString()); // !
    div.appendChild(stage);
  }
  manageBricks.call(this, root);
}

function manageConnections(node) {
  const canvas = $('canvas', node);
  if (!canvas) return;

  const x = this.scrollWidth;
  const y = this.scrollHeight;

  if (canvas.width !== x || canvas.height !== y) {
    canvas.width = x;
    canvas.height = y;
  }

  const groups = getGroups(node, canvas.getBoundingClientRect());
  if (!groups?.length) return;

  const context = canvas.getContext('2d');
  context.clearRect(0, 0, x, y);
  context.beginPath();
  context.strokeStyle = 'red';
  context.lineWidth = 1;

  for (let i = 0; i < groups.length - 1; ++i) {
    const from = groups[i];
    const to   = groups[i + 1];

    const right = Math.min(...to.map(e => e.left));
    const left  = Math.max(...from.map(e => e.right));
    const center = Math.round(left + (right - left) / 2);

    from.forEach(source => {
      to.forEach(target => {
        context.moveTo(source.right, source.top);
        // context.lineTo(target.left, target.top);
        context.bezierCurveTo(
          center, source.top, // c1
          center, target.top, // c2
          target.left, target.top
        )
      });
    });
  }

  context.stroke();
  context.closePath();
}

function manageBricks(node) {
  const slot = $('slot', node);
  const div  = $('div', node);
  if (!slot || !div) return;

  $$('ui-pipeline-stage', div)
    .forEach(stage => clear(stage));

  const bricks = slot
    .assignedElements()
    .filter(e => UIBrick.is(e));

  if (!bricks.length) return;

  bricks.forEach(brick => {
    const stage = brick.getAttribute('stage');
    if (!stage) return;
    const root = $(`ui-pipeline-stage[index="${stage}"]`, div);
    if (!root) return;

    const e = brick.cloneNode(true);
    root.appendChild(e);
  });

  manageConnections.call(this, node);
}

function getGroups(node, rect) {
  const div = $('div', node);
  if (!div) return;

  const stages = $$('ui-pipeline-stage', div);
  return stages.map(stage => {
    return $$('ui-brick', stage)
      .map(brick => brick.getBoundingClientRect())
      .map(r => {
        const left = Math.round(r.x - rect.x);
        const top = Math.round(r.y - rect.y + r.height / 2);
        const right = Math.round(left + r.width);
        return { left, top, right }
      });
  });
}
// #endregion
