const path = require('path');
const scssFileTest = require('./scss');

const ignoreFile = path.join(__dirname,  './scssignore.js')

scssFileTest(ignoreFile);
