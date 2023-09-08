const path = require('path'); 
const LessCompileCache = require('./less-compile-cache');
const fs = require('fs-plus');

module.exports = class ThemeManager {
  constructor({
    styleManager
  }){
    this.styleManager = styleManager;
    this.styleSheetDisposablesBySourcePath = {};
  }

  initialize(params = {}){
    this.resourcePath = params.resourcePath;
    this.lessSourcesByRelativeFilePath = {};
    this.importedFilePathsByRelativeImportPath = {};
  }

  loadBaseStylesheets(){
    this.reloadBaseStylesheets();
  }

  reloadBaseStylesheets() {
    this.requireStylesheet('../static/atom', -2, true);
  }

  requireStylesheet(
    stylesheetPath,
    priority,
    skipDeprecatedSelectorsTransformation,
    skipDeprecatedMathUsageTransformation
  ) {
    let fullPath = this.resolveStylesheet(stylesheetPath);
    if (fullPath) {
      const content = this.loadStylesheet(fullPath);
      this.applyStylesheet(
        fullPath,
        content,
        priority,
        skipDeprecatedSelectorsTransformation,
        skipDeprecatedMathUsageTransformation
      );
    }
  }

  resolveStylesheet(stylesheetPath) {
    if (path.extname(stylesheetPath).length > 0) {
      return fs.resolveOnLoadPath(stylesheetPath);
    } else {
      return fs.resolveOnLoadPath(stylesheetPath, ['css', 'less']);
    }
  }

  loadStylesheet(stylesheetPath, importFallbackVariables) {
    if (path.extname(stylesheetPath) === '.less') {
      return this.loadLessStylesheet(stylesheetPath, importFallbackVariables);
    } else {
      return fs.readFileSync(stylesheetPath, 'utf8');
    }
  }

  loadLessStylesheet(lessStylesheetPath, importFallbackVariables = false) {
    if (this.lessCache == null) {
      this.lessCache = new LessCompileCache({
        resourcePath: this.resourcePath,
        lessSourcesByRelativeFilePath: this.lessSourcesByRelativeFilePath,
        importedFilePathsByRelativeImportPath: this.importedFilePathsByRelativeImportPath,
        importPaths: null
      });
    }

    try {
      if (importFallbackVariables) {
        const baseVarImports = `\
@import "variables/ui-variables";
@import "variables/syntax-variables";\
`;
        const relativeFilePath = path.relative(
          this.resourcePath,
          lessStylesheetPath
        );
        const lessSource = this.lessSourcesByRelativeFilePath[relativeFilePath];

        let content, digest;
        if (lessSource != null) {
          ({ content } = lessSource);
          ({ digest } = lessSource);
        } else {
          content =
            baseVarImports + '\n' + fs.readFileSync(lessStylesheetPath, 'utf8');
          digest = null;
        }

        return this.lessCache.cssForFile(lessStylesheetPath, content, digest);
      } else {
        return this.lessCache.read(lessStylesheetPath);
      }
    } catch (error) {
      let detail, message;
      error.less = true;
      if (error.line != null) {
        // Adjust line numbers for import fallbacks
        if (importFallbackVariables) {
          error.line -= 2;
        }

        message = `Error compiling Less stylesheet: \`${lessStylesheetPath}\``;
        detail = `Line number: ${error.line}\n${error.message}`;
      } else {
        message = `Error loading Less stylesheet: \`${lessStylesheetPath}\``;
        detail = error.message;
      }

      this.notificationManager.addError(message, { detail, dismissable: true });
      throw error;
    }
  }

  applyStylesheet(path, text, priority, skipDeprecatedSelectorsTransformation, skipDeprecatedMathUsageTransformation) {
    this.styleSheetDisposablesBySourcePath[
      path
    ] = this.styleManager.addStyleSheet(text, {
      priority,
      skipDeprecatedSelectorsTransformation,
      skipDeprecatedMathUsageTransformation,
      sourcePath: path
    });

    return this.styleSheetDisposablesBySourcePath[path];
  }
}