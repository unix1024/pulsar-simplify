const PaneContainer = require('./pane-container');

module.exports = class WorkspaceCenter {
  constructor(params) {
    this.paneContainer = new PaneContainer(params);
  }
}