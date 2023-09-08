const path = require('path');
const AtomWindow = require('./atom-window');

module.exports = class AtomApplication{
  static open(options) {
    const createApplication =
      options.createApplication ||
      (async () => {
        const app = new AtomApplication(options);
        await app.initialize(options);
        return app;
      });
    createApplication(options);
  }

  constructor(options) {
    this.resourcePath = options.resourcePath;
    this.fileRecoveryService = null;
  }

  async initialize(options) {
    let resourcePath, windowInitializationScript, openedWindow;

    windowInitializationScript = require.resolve('../initialize-application-window');
    resourcePath = this.resourcePath;

    openedWindow = this.createWindow({
      windowInitializationScript,
      resourcePath
    });
  }

  createWindow(settings) {
    return new AtomWindow(this, this.fileRecoveryService, settings);
  }
}










// function createWindow () {

//   const options = {
//     tabbingIdentifier: 'atom',
//     webPreferences: {
//       backgroundThrottling: !this.isSpec,
//       disableBlinkFeatures: 'Auxclick',
//       nodeIntegration: true,
//       contextIsolation: false,
//       enableRemoteModule: true,
//       webviewTag: true,
//       enableRemoteModule: true,
//       nodeIntegrationInWorker: true
//     }
//   };

//   const mainWindow = new BrowserWindow(options);

//   mainWindow.loadFile(`${resourcePath}/static/index.html`);
//   mainWindow.webContents.openDevTools();

//   Object.defineProperty(mainWindow, 'loadSettingsJSON', {
//     get: () =>
//       JSON.stringify(
//         { resourcePath: resourcePath }
//       )
//   });
  
// }