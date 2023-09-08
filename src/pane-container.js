const { createPaneContainerElement } = require('./pane-container-element'); 
const Pane = require('./pane');

module.exports = class PaneContainer {
  constructor(params) {
    this.viewRegistry = params.viewRegistry;
    this.setRoot(new Pane());
  }

  getElement() {
    return this.element != null
    ? this.element
    : (this.element = createPaneContainerElement().initialize(this, {
        views: this.viewRegistry
      }));
  }

  observeRoot(fn) {
    fn(this.getRoot());
  }

  setRoot(root) {
    this.root = root;
  }

  getRoot() {
    return this.root;   
  }
}