const { createStylesElement } = require('./styles-element');
const { Emitter, Disposable } = require('event-kit');

module.exports = class StyleManager {
  constructor() {
    this.emitter = new Emitter();
    this.styleElements = [];
    this.styleElementsBySourcePath = {};
  }

  observeStyleElements(callback) {
    for (let styleElement of this.getStyleElements()) {
      callback(styleElement);
    }

    // return this.onDidAddStyleElement(callback);
  }

  onDidAddStyleElement(callback) {
    return this.emitter.on('did-add-style-element', callback);
  }

  buildStylesElement() {
    const stylesElement = createStylesElement();
    stylesElement.initialize(this);
    return stylesElement;
  }

  addStyleSheet(source, params = {}){
    let styleElement;
    let updated;
    updated = false;
    styleElement = document.createElement('style');
    if (params.sourcePath != null) {
      styleElement.sourcePath = params.sourcePath;
      styleElement.setAttribute('source-path', params.sourcePath);
    }
    if (params.context != null) {
      styleElement.context = params.context;
      styleElement.setAttribute('context', params.context);
    }
    if (params.priority != null) {
      styleElement.priority = params.priority;
      styleElement.setAttribute('priority', params.priority);
    }

    if (params.skipDeprecatedSelectorsTransformation) {
      styleElement.textContent = source;
    }

    if (updated) {
      this.emitter.emit('did-update-style-element', styleElement);
    } else {
      this.addStyleElement(styleElement);
    }
    
  }

  addStyleElement(styleElement) {
    let insertIndex = this.styleElements.length;
    if (styleElement.priority != null) {
      for (let i = 0; i < this.styleElements.length; i++) {
        const existingElement = this.styleElements[i];
        if (existingElement.priority > styleElement.priority) {
          insertIndex = i;
          break;
        }
      }
    }

    this.styleElements.splice(insertIndex, 0, styleElement);
    if (
      styleElement.sourcePath != null &&
      this.styleElementsBySourcePath[styleElement.sourcePath] == null
    ) {
      this.styleElementsBySourcePath[styleElement.sourcePath] = styleElement;
    }
    // this.emitter.emit('did-add-style-element', styleElement);
  }

  getStyleElements(){
    return this.styleElements.slice();
  }
}