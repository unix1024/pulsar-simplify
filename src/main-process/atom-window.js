const {
  BrowserWindow
} = require('electron');
const url = require('url');
 
module.exports = class AtomWindow{
  constructor(atomApplication, fileRecoveryService, settings = {}){
    
    this.isSpec = settings.isSpec;
    this.resourcePath = settings.resourcePath

    const options = {
      // show: false,
      title: "test-wc",
      tabbingIdentifier: 'atom',
      webPreferences: {
        backgroundThrottling: !this.isSpec,
        disableBlinkFeatures: 'Auxclick',
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        webviewTag: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true
      }
    };

    const BrowserWindowConstructor = settings.browserWindowConstructor || BrowserWindow;
    this.browserWindow = new BrowserWindowConstructor(options);

    Object.defineProperty(this.browserWindow, 'loadSettingsJSON', {
      get: () =>
        JSON.stringify(
          Object.assign(
            {
              userSettings: !this.isSpec
                ? "this.atomApplication.configFile.get()"
                : null
            },
            this.loadSettings
          )
        )
    });
    this.loadSettings = Object.assign({}, settings);
    this.loadSettings.atomHome = process.env.ATOM_HOME;

    this.browserWindow.loadURL(
      url.format({
        protocol: 'file',
        pathname: `${this.resourcePath}/static/index.html`,
        slashes: true
      })
    );
    this.browserWindow.webContents.openDevTools();
  }


}