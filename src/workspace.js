const { createWorkspaceElement } = require('./workspace-element');
const PanelContainer = require('./panel-container');
const WorkspaceCenter = require('./workspace-center');

module.exports = class Workspace {
  constructor(params){

    this.viewRegistry = params.viewRegistry;

    this.paneContainers = {
      center: this.createCenter(),
      left: null,
      right: null,
      bottom: null
    };

    this.panelContainers = {
      top: new PanelContainer({
        location: 'top'
      }),
      left: new PanelContainer({
        location: 'left'
      }),
      right: new PanelContainer({
        location: 'right'
      }),
      bottom: new PanelContainer({
        location: 'bottom'
      }),
      header: new PanelContainer({
        location: 'header'
      }), 
      footer: new PanelContainer({
        location: 'footer'
      })
    };

  } 

  getElement(){
    if (!this.element) {
      this.element = createWorkspaceElement().initialize(this);
    }
    return this.element;
  }

  createCenter() {
    return new WorkspaceCenter({
      viewRegistry: this.viewRegistry
    });
  }

  getCenter() {
    return this.paneContainers.center;
  }
}