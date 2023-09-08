class StylesElement extends HTMLElement {
  constructor() {
    super();
  }

  initialize(styleManager) {
    this.styleManager = styleManager;
    this.styleManager.observeStyleElements(this.styleElementAdded.bind(this))
  }

  styleElementAdded(styleElement) {
    let insertBefore;

    const styleElementClone = styleElement.cloneNode(true);
    styleElementClone.sourcePath = styleElement.sourcePath;
    styleElementClone.context = styleElement.context;
    styleElementClone.priority = styleElement.priority;

    const { priority } = styleElement;
    if (priority != null) {
      for (let child of this.children) {
        if (child.priority > priority) {
          insertBefore = child;
          break;
        }
      }
    }

    this.insertBefore(styleElementClone, insertBefore);
    // this.emitter.emit('did-add-style-element', styleElementClone);
  }
}

window.customElements.define('atom-styles', StylesElement);

function createStylesElement() {
  return document.createElement('atom-styles');
}

module.exports = {
  createStylesElement
};
