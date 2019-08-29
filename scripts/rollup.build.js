const fs = require('fs');
const path = require('path');
const glob = require("glob");
const react_redux = require("react-redux");
const redux  = require("redux");

const typescript = require("rollup-plugin-typescript");

const scss = require("rollup-plugin-scss");

// const multiEntry = require("rollup-plugin-multi-entry");

const rollup = require('rollup');


let configFileName;
let srcDirPath = '../src/modules';
let outDirPath = 'build/static/js/assets/';


async function build(inputOptions,outputOptions) {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    // console.log(bundle.watchFiles); // an array of file names this bundle depends on

    // generate code
    const {output} = await bundle.generate(outputOptions);
    // console.log(output);
    for (const chunkOrAsset of output) {
        // console.log(chunkOrAsset.name)
        if (chunkOrAsset.isAsset) {
            // For assets, this contains
            // {
            //   isAsset: true,                 // signifies that this is an asset
            //   fileName: string,              // the asset file name
            //   source: string | Buffer        // the asset source
            // }
            // console.log('Asset', chunkOrAsset);
        } else {
            // For chunks, this contains
            // {
            //   code: string,                  // the generated JS code
            //   dynamicImports: string[],      // external modules imported dynamically by the chunk
            //   exports: string[],             // exported variable names
            //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
            //   fileName: string,              // the chunk file name
            //   imports: string[],             // external modules imported statically by the chunk
            //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
            //   isEntry: boolean,              // is this chunk a static entry point
            //   map: string | null,            // sourcemaps if present
            //   modules: {                     // information about the modules in this chunk
            //     [id: string]: {
            //       renderedExports: string[]; // exported variable names that were included
            //       removedExports: string[];  // exported variable names that were removed
            //       renderedLength: number;    // the length of the remaining code in this module
            //       originalLength: number;    // the original length of the code in this module
            //     };
            //   },
            //   name: string                   // the name of this chunk as used in naming patterns
            // }
            // console.log('Chunk', chunkOrAsset.modules);
        }
    }

    // or write the bundle to disk
    await bundle.write(outputOptions);
}


let configFile = configFileName ? require(configFileName) : '';
let ignoreFiles = ['**/*.test.tsx'];
if (configFile.ignoreFiles) {

    ignoreFiles = ignoreFiles.concat(configFile.ignoreFiles)
}
const srcDir = path.join(__dirname, srcDirPath);

glob("**/*.module.tsx", {cwd: srcDir, ignore: ignoreFiles}, function (er, files) {
    console.log('rollup for number of module ' +  files.length)
    for (var i = 0; i < files.length; i++) {
        const fileName = srcDir +"/"+ files[i];
        console.log(fileName);
        // console.log(path.parse(fileName));
        console.log("fileName ......................................................");
        // see below for details on the options
        // const inputOptions = {
        //     // core input options
        //     external,
        //     input, // required
        //     plugins,
        //
        //     // advanced input options
        //     cache,
        //     inlineDynamicImports,
        //     manualChunks,
        //     onwarn,
        //     preserveModules,
        //
        //     // danger zone
        //     acorn,
        //     acornInjectPlugins,
        //     context,
        //     moduleContext,
        //     preserveSymlinks,
        //     shimMissingExports,
        //     treeshake,
        //
        //     // experimental
        //     chunkGroupingSize,
        //     experimentalCacheExpiry,
        //     experimentalOptimizeChunks,
        //     experimentalTopLevelAwait,
        //     perf
        // };

        const inputOptions = {
            // core input options
            // external:{
            //
            // },
            // input: './src/**/AccountMailBoxFull.tsx',
            input: fileName,
            plugins: [
                typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
                scss({
                    output: outDirPath + path.parse(fileName).name + '.css',

                    // output: function (styles, styleNodes) {
                    //     // console.log(styleNodes);
                    //     // console.log(styles);
                    //
                    //     let fileData = 'appendStyle("' + styles + '")';
                    //
                    //     console.log("..................." + files[i]);
                    //     fs.appendFile(files[i], fileData, function (err) {
                    //         if (err) throw err;
                    //         console.log('Saved!');
                    //     });
                    //
                    //     // writeFileSync('bundle.css', styles)
                    //
                    // },
                }),
                // multiEntry()
            ],

            // advanced input options

        };

        // const outputOptions = {
        //     // core output options
        //     dir,
        //     file,
        //     format, // required
        //     globals,
        //     name,
        //
        //     // advanced output options
        //     assetFileNames,
        //     banner,
        //     chunkFileNames,
        //     compact,
        //     entryFileNames,
        //     extend,
        //     footer,
        //     interop,
        //     intro,
        //     outro,
        //     paths,
        //     sourcemap,
        //     sourcemapExcludeSources,
        //     sourcemapFile,
        //     sourcemapPathTransform,
        //
        //     // danger zone
        //     amd,
        //     dynamicImportFunction,
        //     esModule,
        //     exports,
        //     freeze,
        //     indent,
        //     namespaceToStringTag,
        //     noConflict,
        //     preferConst,
        //     strict
        // };

        const outputOptions = {
            // core output options
            dir: outDirPath,
            format: 'umd',
            globals: {
                react: 'React',
                reactstrap: 'reactstrap',
                'query-string' : 'qs',
                'react-loader-spinner': 'react-loader-spinner',
                'react-redux' : 'react-redux',
                redux : 'redux',
                'rxjs' : 'rxjs',
                'redux-observable' : 'redux-observable',
                'rxjs/operators' : 'rxoperators'

            },
            name : path.parse(fileName).name.split(".")[0],


            // advanced output options
            // assetFileNames,
            // banner,
            // chunkFileNames,
            // compact,
            // entryFileNames,
            // extend,
            // footer,
            // interop,
            // intro,
            // outro,
            // paths,
            sourcemap: true
            // sourcemapExcludeSources,
            // sourcemapFile,
            // sourcemapPathTransform,


        };








        build(inputOptions,outputOptions).then((res)=>{
            // console.log(res);
            // write css code in component js file
            console.log(outputOptions.name);
            // method 1
            // var data = fs.readFileSync(outDirPath + outputOptions.name.split(".")[0] +'.css','utf8');
            // let styles = data;
            //
            // // Invoke the next step here however you like
            //  console.log(typeof styles);   // Put all of the code here (not the best solution)
            // // processFile();          // Or put the next step in a function and invoke it
            //
            // let fileData = "appendStyle('" + styles.toString() + "')";
            //
            //
            // fs.appendFile(outDirPath + outputOptions.name.split(".")[0] +'.js', fileData, function (err) {
            //     if (err) throw err;
            //     console.log('Saved!');
            // });

            // method 2
            // fs.readFile(outDirPath + outputOptions.name.split(".")[0] +'.css' , 'utf8' ,function read(err, data) {
            //     if (err) {
            //         console.log('errrrr');
            //         throw err;
            //     }
            //     let styles = data;
            //
            //     // Invoke the next step here however you like
            //     console.log(styles);   // Put all of the code here (not the best solution)
            //     // processFile();          // Or put the next step in a function and invoke it
            //
            //     let fileData = 'appendStyle("' + styles + '")';
            //
            //
            //     fs.appendFile(outDirPath + outputOptions.name.split(".")[0] +'.js',fileData, function (err) {
            //         if (err) throw err;
            //         console.log('Saved!');
            //     });
            //
            // });

            // method 3
            var data = '';

            var readStream = fs.createReadStream(outDirPath + path.parse(fileName).name +'.css' , 'utf8');

            readStream.on('data', function(chunk) {
                data += chunk;
            }).on('end', function() {
                console.log("build is done for " + fileName);
                let styles = data;


                // console.log(styles);
                var strSingleLineText = styles.replace(
                    // Replace out the new line character.
                    new RegExp( "\\n", "g" ),

                    // Put in ... so we can see a visual representation of where
                    // the new line characters were replaced out.
                    ""
                );
                // console.log(strSingleLineText);
                let fileData = 'var temp = \' ' + strSingleLineText + '\'\n';
                fileData =  fileData + 'appendStyle(temp)';




                fs.appendFile(outDirPath + path.parse(fileName).name +'.js',fileData, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });
            });


        }).catch((errObj)=>{
            console.log('rollup build error for file ' + fileName);
            console.log(errObj);
        });


    }
});
