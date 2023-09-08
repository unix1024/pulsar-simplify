const { app } = require('electron');
const parseCommandLine = require('./parse-command-line');
const path = require('path');
const atomPaths = require('../atom-paths');

module.exports = function start(resourcePath, devResourcePath, startTime){

  const args = parseCommandLine(process.argv.slice(1));
  args.resourcePath = normalizeDriveLetterName(resourcePath);
  args.devResourcePath = normalizeDriveLetterName(devResourcePath);

  atomPaths.setAtomHome(app.getPath('home'));

  app.on('ready', function() {
    const AtomApplication = require(path.join(
      args.resourcePath,
      'src',
      'main-process',
      'atom-application'
    ));
    AtomApplication.open(args);
  });
}

function normalizeDriveLetterName(filePath) {
  if (process.platform === 'win32' && filePath) {
    return filePath.replace(
      /^([a-z]):/,
      ([driveLetter]) => driveLetter.toUpperCase() + ':'
    );
  } else {
    return filePath;
  }
}