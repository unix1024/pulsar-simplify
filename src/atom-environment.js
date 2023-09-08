const Workspace = require('./workspace');
const StyleManager = require('./style-manager');
const ThemeManager = require('./theme-manager');
const getWindowLoadSettings = require('./get-window-load-settings');

class AtomEnvironment {
  constructor(){
    this.styles = new StyleManager();

    this.themes = new ThemeManager({
      styleManager: this.styles
    });

    this.workspace = new Workspace();
  }

  initialize(params = {}){
    this.window = params.window;
    this.document = params.document;

    const { resourcePath } = getWindowLoadSettings();

    this.themes.initialize({ resourcePath });

    this.themes.loadBaseStylesheets();

    this.stylesElement = this.styles.buildStylesElement();
    this.document.head.appendChild(this.stylesElement);

    // const didChangeStyles = this.didChangeStyles.bind(this);

    // this.styles.onDidAddStyleElement(didChangeStyles);
  }

  startEditorWindow(){
    document.body.appendChild(this.workspace.getElement());
  }

  didChangeStyles(styleElement) {
    TextEditor.didUpdateStyles();
    if (styleElement.textContent.indexOf('scrollbar') >= 0) {
      TextEditor.didUpdateScrollbarStyles();
    }
  }
}

module.exports = AtomEnvironment;