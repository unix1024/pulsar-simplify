const startTime = Date.now();
const yargs = require('yargs');
const path = require('path');

const args = yargs(process.argv)
  .help(false)
  .version(false)
  .alias('r', 'resource-path').argv;

let resourcePath;
let devResourcePath;

if (args.resourcePath) {
  resourcePath = args.resourcePath;
  devResourcePath = resourcePath;
}else{
  stableResourcePath = path.dirname(path.dirname(__dirname));
  devResourcePath = stableResourcePath;
  resourcePath = stableResourcePath;
}

const start = require(path.join(resourcePath, 'src', 'main-process', 'start'));
start(resourcePath, devResourcePath, startTime);
