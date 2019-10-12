const path = require('path');
const componentScssValidation = require('./ComponentScssValidation');
const componentScssValidationNpm=require('./ComponentScssValidationFromNpm');
const ignoreFilePath = 'scripts/ComponentScssConfig';
const ignoreFile = path.join(path.resolve("."), ignoreFilePath)


// componentScssValidation(ignoreFile);
componentScssValidationNpm(ignoreFile);
