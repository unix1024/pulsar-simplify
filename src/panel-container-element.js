class PanelContainerElement extends HTMLElement {
  constructor(){
    super();
  }

  // connectedCallback() {
  //   this.innerHTML = 'panel-container';
  // }

  initialize(model){
    this.model = model;

    this.classList.add(this.model.getLocation());
    
    return this;
  }
}

window.customElements.define('atom-panel-container', PanelContainerElement);

function createPanelContainerElement() {
  return document.createElement('atom-panel-container');
}

module.exports = {
  createPanelContainerElement
};