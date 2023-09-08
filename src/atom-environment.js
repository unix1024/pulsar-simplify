const Workspace = require('./workspace');
const StyleManager = require('./style-manager');
const ThemeManager = require('./theme-manager');
const getWindowLoadSettings = require('./get-window-load-settings');
const ViewRegistry = require('./view-registry');

class AtomEnvironment {
  constructor(){

    this.views = new ViewRegistry(this);
    
    this.styles = new StyleManager();

    this.themes = new ThemeManager({
      styleManager: this.styles
    });

    this.workspace = new Workspace({
      viewRegistry: this.views
    });
  }

  initialize(params = {}){
    this.window = params.window;
    this.document = params.document;

    const { resourcePath } = getWindowLoadSettings();

    this.themes.initialize({ resourcePath });

    this.themes.loadBaseStylesheets();

    this.stylesElement = this.styles.buildStylesElement();
    this.document.head.appendChild(this.stylesElement);
  }

  startEditorWindow(){
    document.body.appendChild(this.workspace.getElement());
  }
}

module.exports = AtomEnvironment;