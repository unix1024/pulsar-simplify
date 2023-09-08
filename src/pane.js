const { createPaneElement } = require('./pane-element');

module.exports = class Pane {
  constructor(params = {}) {

  }

  getElement() {
    if (!this.element) {
      this.element = createPaneElement().initialize(this);
    }
    return this.element;
  }
}