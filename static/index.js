(function(){
  const entryPointDirPath = __dirname;
  const path = require('path');
  const getWindowLoadSettings = require('../src/get-window-load-settings');

  window.onload = function(){
    setupWindow();
  }

  function setupWindow() {
    const initScriptPath = path.relative(
      entryPointDirPath,
      getWindowLoadSettings().windowInitializationScript
    );
    
    const initialize = require(initScriptPath);
    initialize();
  }

})();

