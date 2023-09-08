class PaneElement extends HTMLElement {
  constructor() {
    super();
  }

  initialize(model) {
    this.model = model;
    return this;
  }
}

function createPaneElement() {
  return document.createElement('atom-pane');
}

window.customElements.define('atom-pane', PaneElement);
 
module.exports = {
  createPaneElement
};
