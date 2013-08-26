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
          baseUrl: "../src/js",
          mainConfigFile: "../src/js/config.js",
          out: "path/to/optimized.js"
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