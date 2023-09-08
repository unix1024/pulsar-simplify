class PaneContainerElement extends HTMLElement {
  constructor() {
    super();
  }
  
  initialize(model, { views }) {
    this.model = model;
    this.views = views;
    
    this.model.observeRoot(this.rootChanged.bind(this));

    return this;
  }

  rootChanged(root) {
    if (root != null) {
      const view = this.views.getView(root);
      this.appendChild(view);
    }
  }
}

window.customElements.define('atom-pane-container', PaneContainerElement);

function createPaneContainerElement() {
  return document.createElement('atom-pane-container');
}
 
module.exports = {
  createPaneContainerElement
};