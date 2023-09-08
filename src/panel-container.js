const { createPanelContainerElement } = require('./panel-container-element');

module.exports = class PanelContainer {
  constructor({location} = {}){
    this.location = location;
  }

  getElement() {
    if (!this.element) {
      this.element = createPanelContainerElement().initialize(this);
    }
    return this.element;
  }

  getLocation() {
    return this.location;
  }

}