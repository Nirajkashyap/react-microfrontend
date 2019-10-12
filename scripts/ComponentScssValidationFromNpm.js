const fs = require('fs');
const path = require('path');
const readline = require('readline');
const glob = require("glob");
const scssValidator = require("scss-validator");


module.exports = function (configFileName) {

    console.log('configFileName ' , configFileName);


    // console.log(path.join(__dirname,  configFileName))
    let configFile =  configFileName ? require(configFileName) : '';
    let ignoreFiles =  ['**/*.test.tsx'];
    // check data type of configFile.ignoreFiles
    // console.log(configFile.ignoreFiles.constructor  , typeof configFile.ignoreFiles)
    if(configFile.ignoreFiles){

        ignoreFiles = ignoreFiles.concat(configFile.ignoreFiles)
    }
    let srcDirPath = configFile.srcDir ? configFile.srcDir : ".";
    const srcDir = path.join(path.resolve("."),srcDirPath);
    console.log("ignoreFiles ",ignoreFiles);
    glob("**/*.tsx", { cwd  : srcDir , ignore : ignoreFiles}, function (er, files) {
        // files is an array of filenames.
        // If the `nonull` option is set, and nothing
        // was found, then files is ["**/*.js"]
        // er is an error object or null.
        for(var i =0 ; i < files.length; i++){
            const fileName = srcDir +"/"+ files[i];

            const directories = path.dirname(fileName);
            // console.log(directories);
            const basename = path.basename(fileName);
            // console.log(basename)
            let errorFlag = false;
            fs.readFile(fileName, 'utf8', function (err, contents) {
                // note 
                console.log("regex is to get first root div in jsx i.e after return statement first root div");
                // const regex = /render\(\)\s+{\s+return\s\(\s+<.*>/g;
                // const regex = /return\s\(\s.<.*>/g
                const regex = /return\s*\((.|\n)*<(.|\n)*>/g
                // change in regex to include function state less component
                // const regex = /render\(\)*+{\+return\s\(\s+<.*>/g;
                let found = contents.match(regex);
                if(found){

                    // console.log(found);
                    let splitter = found[0].substr(found[0].indexOf("className") + 10, 1); // 'className=' is of length 10\
                    // console.log("react jsx root tag splitter " , splitter);
                    let className = found[0].substr(found[0].indexOf("className") + 10).split(splitter)[1];



                    let tempFileNameArray = fileName.split("/");
                    let expectedClassName = tempFileNameArray[tempFileNameArray.length - 1].split(".")[0];
                    console.log("get all attribute of root div in array " , className.split(" "));
                    
                    // console.log(className.split(" ").includes(expectedClassName+'-component'));
                    if (className.split(" ").includes(expectedClassName+'-component')) {
                        // console.log("correct classname for root div of jsx/tsx");
                        // console.log(directories+ '/'+ expectedClassName+'.scss');
                        // const scssFile = directories + '/' + expectedClassName + '.scss';
                        let spaceTagClassNameCheckArray = []
                        if(configFile && configFile.spaceTagClassNameCheck && typeof Array.isArray(configFile.spaceTagClassNameCheck)){
                            spaceTagClassNameCheckArray = configFile.spaceTagClassNameCheck;
                        }

                        let containTagClassNameCheckArray = []
                        if(configFile && configFile.containTagClassNameCheck && typeof Array.isArray(configFile.containTagClassNameCheck)){
                            containTagClassNameCheckArray = configFile.containTagClassNameCheck;
                        }
                        
                        let configObject = {
                            'srcDir' : "./src/components",
                            'srcFile' : expectedClassName+'.scss',
                            'ignoreFiles' : [],
                            'spaceTagClassNameCheck' : spaceTagClassNameCheckArray,
                            'containTagClassNameCheck' : containTagClassNameCheckArray
                        
                        }
                        console.log("run.............................script")
                        scssValidator(configObject);
                        
                    } else {
                        console.log("wrong classname for root div of jsx/tsx filename " + fileName);
                        throw new Error("Error on file " + fileName + " and error message : " +  " wrong classname for root div of jsx/tsx  ");
                    }

                }else{
                    console.log('Different/wrong structure is used to build react component ' +  fileName)
                    throw new Error("Error on file " + fileName + " and error message : " +  " Different/wrong structure is used to build react component ");
                }

            });


        }
    })
}

/*
fs.readdir('../src/components/', (err, files) => {
    files.forEach(file => {
        console.log(file);




    });
});
*/
