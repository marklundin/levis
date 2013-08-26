module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    gitinfo:{},

    copy:{
      main:{
        files:[{ 
          expand: true,
          cwd: '../src', 
          src: ['**'], 
          dest: '../versions/<%= gitinfo.local.branch.current.shortSHA %>'
        }]
      }
    },

    requirejs: {
      compile: {
        options: {
          name: 'main',
          baseUrl: "../src/js",
          out: "../src/js/optimized.js",
          optimize: "none",
          waitSeconds: 0,
          paths: {
                "glsl": "loaders/glsl",
                "text": "loaders/text",
                "json": "loaders/json",
                "template": "loaders/template",
                // "libs": './libs'
          },

          shim:{

            "libs/threejs/build/three":{
              exports: "THREE"
            },

            "purl":{
              deps:['jquery']
            },

            "libs/jquery-ui": ['jquery'],



            // "libs/underscore.js":{
            //  exports: "_"
            // },

            "libs/threejs/examples/js/postprocessing/EffectComposer": [
              'libs/threejs/build/three',
              "libs/threejs/examples/js/shaders/CopyShader", 
              "libs/threejs/examples/js/postprocessing/ShaderPass",
              "libs/threejs/examples/js/shaders/FXAAShader",
              // "libs/threejs/examples/js/postprocessing/RenderPass",
              // "libs/threejs/examples/js/shaders/SSAOShader",
              "libs/threejs/examples/js/postprocessing/MaskPass"
            ],

            "libs/threejs/examples/js/controls/OrbitControls": ['libs/threejs/build/three'] ,
            "libs/threejs/examples/js/controls/PathControls": [
              'libs/threejs/build/three',
              "libs/threejs/src/extras/animation/Animation"
            ] ,
            "libs/threejs/src/extras/animation/Animation": ['libs/threejs/build/three'] ,
            "libs/threejs/examples/js/shaders/SSAOShader": ['libs/threejs/build/three'] ,
            "libs/threejs/examples/js/shaders/FXAAShader": ['libs/threejs/build/three'] ,
            "libs/threejs/examples/js/shaders/CopyShader": ['libs/threejs/build/three'] ,
            "libs/threejs/examples/js/postprocessing/RenderPass": ['libs/threejs/build/three'] ,
            "libs/threejs/examples/js/postprocessing/ShaderPass": ['libs/threejs/build/three'],
            "libs/threejs/examples/js/postprocessing/MaskPass":['libs/threejs/build/three'],
            "libs/threejs/examples/js/controls/TransformControls":['libs/threejs/build/three'],
            
            "libs/threejs/examples/js/ImprovedNoise": {
              exports:"ImprovedNoise"
            }
          
          },
          uglify2: {
              compress: {
                  drop_debugger: true,
                  sequences: false,
                  conditionals: false,
                  join_vars: false,
                  properties: false,
                  global_defs: {
                      DEBUG: true,
                      VERSION: "UNKNOWN"
                  }
              }
          }
        }
      }
    }

  });

  grunt.registerTask("index", "Updates index", function ( prop, cwd ) {

    grunt.log.writeln( grunt.option('m') )
    var versionfile   = grunt.file.readJSON( "../versions.json" );
    var sha           = grunt.config( "gitinfo" ).local.branch.current.shortSHA;
    versionfile[sha]  = {
      url: "versions/" + sha,
      title: grunt.option('m') || "Version "+ sha
    }
    grunt.file.write( "../versions.json", JSON.stringify( versionfile ));
   
  });


  


  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gitinfo');

  // Default task(s).
  grunt.registerTask( 'snap', ['gitinfo', 'index', 'copy']);
  grunt.registerTask( 'default', ['snap']);


};