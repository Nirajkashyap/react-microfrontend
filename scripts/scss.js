const fs = require('fs');
const path = require('path');
const readline = require('readline');
const glob = require("glob");


module.exports = function (configFileName) {

    console.log(configFileName ,' ...');

    // console.log(path.join(__dirname,  configFileName))
    let configFile =  configFileName ? require(configFileName) : '';
    let ignoreFiles =  ['**/*.test.tsx'];
    // check data type of configFile.ignoreFiles
    // console.log(configFile.ignoreFiles.constructor  , typeof configFile.ignoreFiles)
    if(configFile.ignoreFiles){

        ignoreFiles = ignoreFiles.concat(configFile.ignoreFiles)
    }
    const srcDir = path.join(__dirname,'../src/components');
    console.log(ignoreFiles);
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
                // const regex = /render\(\)\s+{\s+return\s\(\s+<.*>/g;
                // const regex = /return\s\(\s.<.*>/g
                const regex = /return\s*\((.|\n)*<(.|\n)*>/g
                // change in regex to include function state less component
                // const regex = /render\(\)*+{\+return\s\(\s+<.*>/g;
                let found = contents.match(regex);
                if(found){

                    // console.log(found);
                    let splitter = found[0].substr(found[0].indexOf("className") + 10, 1); // 'className=' is of length 10\
                    // console.log(splitter);
                    let className = found[0].substr(found[0].indexOf("className") + 10).split(splitter)[1];



                    let tempFileNameArray = fileName.split("/");
                    let expectedClassName = tempFileNameArray[tempFileNameArray.length - 1].split(".")[0];
                    // console.log(className.split(" "));
                    // console.log(className.split(" ").includes(expectedClassName+'-cmp'));
                    if (className.split(" ").includes(expectedClassName+'-cmp')) {
                        // console.log("correct classname for root div of jsx/tsx");
                        // console.log(directories+ '/'+ expectedClassName+'.scss');
                        const scssFile = directories + '/' + expectedClassName + '.scss';
                        fs.exists(scssFile, (exists) => {

                            if (exists) {
                                // console.log('scss file exist');
                                // console.log(exists);


                                const rl = readline.createInterface({
                                    input: fs.createReadStream(scssFile),
                                    crlfDelay: Infinity
                                });
                                const filecontextArray = []
                                rl.on('line', (line) => {
                                    // console.log(`Line from file: ${line}`);
                                    if (line.indexOf('//') > -1 || line.indexOf('@import') > -1) {
                                        // do nothing
                                    } else {
                                        filecontextArray.push(line)
                                    }
                                }).on('close', () => {

                                    // console.log(filecontextArray);
                                    const filecontext = filecontextArray.join("");
                                    // console.log(filecontext);
                                    const regex2 = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm
                                    // let found2 = filecontext.match(regex2);
                                    // console.log(found2);
                                    const data = filecontext.replace(regex2, '');
                                    // console.log(data);
                                    var counter = 1;
                                    var firstIndex = data.indexOf('{');
                                    var flag = false;
                                    for (var i = firstIndex + 1; i < data.length; i++) {

                                        // console.log(data[i]);
                                        if (data[i] === '{') {
                                            counter++
                                        } else if (data[i] === '}') {
                                            counter--
                                        } else {
                                            //
                                        }


                                        if (counter < 1) {
                                            // console.log('break');
                                            flag = true;
                                        }

                                        if (flag && counter > 0) {

                                            break;
                                        }
                                    }

                                    if (flag && counter > 0) {
                                        console.log('wrong scss format');
                                        errorFlag = true;
                                        throw new Error("Error on file " + fileName + " and error message: " +  " wrong scss format");

                                    } else {
                                        // console.log('right scss format');

                                        console.log(data);

                                        console.log(configFile);

                                        const regex =  '\\s\{1\}\\*\{1\}' +  '\\s*{';
                                        const bodyregex = new RegExp(regex, 'gm');
                                        let bodymatch;
                                        console.log(bodyregex);
                                        while ((bodymatch = bodyregex.exec(data)) !== null) {
                                            // This is necessary to avoid infinite loops with zero-width matches
                                            if (bodymatch.index === bodyregex.lastIndex) {
                                                bodyregex.lastIndex++;
                                            }

                                            // The result can be accessed through the `m`-variable.
                                            bodymatch.forEach((match, groupIndex) => {
                                                console.log(`Found match, group ${groupIndex}: ${match}`);
                                                throw new Error("Error on file " + fileName + " and error message:  * " + " tag is used in css class " );

                                                errorFlag = true;
                                            });
                                        }
                                        if(configFile && configFile.spaceTagClassNameCheck && typeof Array.isArray(configFile.spaceTagClassNameCheck)){
                                            console.log('checking for spaceTagClassNameCheck' , configFile.spaceTagClassNameCheck)
                                            for(var i = 0 ; i < configFile.spaceTagClassNameCheck.length ; i++){

                                                const regex =  '\\s\{1\}' + configFile.spaceTagClassNameCheck[i] + '\\s*{';
                                                const bodyregex = new RegExp(regex, 'gm');
                                                let bodymatch;
                                                console.log(bodyregex);
                                                while ((bodymatch = bodyregex.exec(data)) !== null) {
                                                    // This is necessary to avoid infinite loops with zero-width matches
                                                    if (bodymatch.index === bodyregex.lastIndex) {
                                                        bodyregex.lastIndex++;
                                                    }

                                                    // The result can be accessed through the `m`-variable.
                                                    bodymatch.forEach((match, groupIndex) => {
                                                        console.log(`Found match, group ${groupIndex}: ${match}`);
                                                        throw new Error("Error on file " + fileName + " and error message: " +  configFile.spaceTagClassNameCheck[i] + " tag is used in css class " );

                                                        errorFlag = true;
                                                    });
                                                }

                                            }

                                        }

                                        if(configFile && configFile.containTagClassNameCheck && typeof Array.isArray(configFile.containTagClassNameCheck)){
                                            console.log('checking for containTagClassNameCheck' , configFile.containTagClassNameCheck)
                                            for(var i = 0 ; i < configFile.containTagClassNameCheck.length ; i++){

                                                const regex =  configFile.containTagClassNameCheck[i] + '\\s*{';
                                                const bodyregex = new RegExp(regex, 'gm');
                                                let bodymatch;
                                                console.log(bodyregex);
                                                while ((bodymatch = bodyregex.exec(data)) !== null) {
                                                    // This is necessary to avoid infinite loops with zero-width matches
                                                    if (bodymatch.index === bodyregex.lastIndex) {
                                                        bodyregex.lastIndex++;
                                                    }

                                                    // The result can be accessed through the `m`-variable.
                                                    bodymatch.forEach((match, groupIndex) => {
                                                        console.log(`Found match, group ${groupIndex}: ${match}`);
                                                        throw new Error("Error on file " + fileName + " and error message: " +  configFile.containTagClassNameCheck[i] + " tag is used in css class ");

                                                        errorFlag = true;
                                                    });
                                                }

                                            }

                                        }

                                        /*
                                        const divyregex = /div\s*{/gm;
                                        let divmatch;

                                        while ((divmatch = divyregex.exec(str)) !== null) {
                                            // This is necessary to avoid infinite loops with zero-width matches
                                            if (divmatch.index === divyregex.lastIndex) {
                                                divyregex.lastIndex++;
                                            }

                                            // The result can be accessed through the `m`-variable.
                                            divmatch.forEach((match, groupIndex) => {
                                                console.log(`Found match, group ${groupIndex}: ${match}`);
                                                throw new Error("Error on file " + fileName + " and error message: " +  " div tag is used in css class");

                                                errorFlag = true;
                                            });
                                        }
                                        */



                                        var classNameKeyReg = new RegExp('.' + expectedClassName + '-cmp', "g");
                                        // console.log(fileName , data.match(classNameKeyReg));
                                        if (data.match(classNameKeyReg) === null || data.match(classNameKeyReg).length !== 1) {
                                            console.log('component className is not used or used multiple time  ' + fileName);
                                            throw new Error("Error on file " + fileName + " and error message: " +  " component className is not used or used multiple time");

                                            errorFlag = true;
                                        } else {
                                            console.log('Hurray it is working fine for ' +  fileName);
                                        }

                                    }

                                });
                            } else {
                                console.log('scss file not exist for' + fileName);
                                throw new Error("Error on file " + fileName + " and error message : " +  " scss file not exist ");

                            }

                        })
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
