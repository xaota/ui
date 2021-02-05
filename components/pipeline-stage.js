import Component, {html, css} from '../script/Component.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  slot {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }`;

/** PipelineStage {UIPipelineStage} @class @ui @component <ui-pipeline-stage />
  * Группа параллельных элементов пайплайна
  */
  export default class UIPipelineStage extends Component {
    static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
      </template>`;

  /** Создание компонента {UIPipelineStage} @constructor
    * @param {type} store type
    */
    constructor(store) {
      super();
      // this.store({store});
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {UIPipelineStage} @this текущий компонент
    */
    mount(node) {
      super.mount(node, attributes, properties);

      // const {store} = this.store();
      return this;
    }


  }

Component.init(UIPipelineStage, 'ui-pipeline-stage', {attributes, properties});
