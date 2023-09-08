const AtomEnvironment = require('./atom-environment');

global.atom = new AtomEnvironment();

module.exports = function(){
  const getWindowLoadSettings = require('./get-window-load-settings');
  const { resourcePath } = getWindowLoadSettings();

  global.atom.initialize({
    window, 
    document
  });

  global.atom.startEditorWindow();
}

