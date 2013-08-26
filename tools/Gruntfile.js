module.exports = function(grunt) {


  var dev = grunt.file.readJSON( 'dev.build.js' );
  
  var replaceOptions = {
      variables: {
        'date': '<%= grunt.template.today() %>'
      }
    }



  // Project configuration. 
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


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
      dev: {
        options: dev
      }
    },

    replace: {
      dist: {
        options: replaceOptions,
        files: [
          {expand: true, flatten: true, src: ['../build/index.html'], dest:'../build/'}
        ]
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





  var CWD = "cwd";
  var PROP = "prop";
  var DIRTY_MARK = "dirtyMark";

    grunt.registerTask("describe", "Describes current git commit", function (prop, cwd) {
        // Start async task
        var done = this.async();

        // Define default options
        var options = {};
        options[CWD] = ".";
        options[DIRTY_MARK] = "-dirty";

        // Load cli options (with defaults)
        options = this.options(options);

        // Override options
        options[PROP] = prop || options[PROP];
        options[CWD] = cwd || options[CWD];
        options[DIRTY_MARK] = grunt.option(DIRTY_MARK) || options[DIRTY_MARK];

        // Log flags (if verbose)
        grunt.log.verbose.writeflags(options);

        // Spawn git
        grunt.util.spawn({
            "cmd" : "git",
            "args" : [ "describe", "--tags", "--always", "--long" ],
            "opts" : {
            "cwd" : options[CWD]
        }
        }, function (err, result) {
            // If an error occurred...
            if (err) {
            // Done with false
            done(false);

            // Fail with error
            grunt.fail.warn(err);
        }

        // If we were passed a prop we should update
        if (options[PROP]) {
            global[options[PROP]] = result;
            // grunt.config(options[PROP], result);
        }

        // Done with result
            done(result);
        });
    });

    grunt.registerTask('_stamp', function(){
        grunt.log.write( 'VERSION: ' +  dev.uglify2.compress.global_defs.VERSION );
        dev.uglify2.compress.global_defs.VERSION = String( global['version'] );
        replaceOptions.variables.version = String( global['version'] );
        grunt.log.write( 'VERSION: ' +  dev.uglify2.compress.global_defs.VERSION );
    })


  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks('grunt-replace');

  // Default task(s).
  grunt.registerTask( 'snap', ['gitinfo', 'index', 'copy']);
  grunt.registerTask( 'version',  ['describe:version', '_stamp'] );
  grunt.registerTask( 'build',  'Build the release version of the project.', [ 'version', 'requirejs:dev', "replace" ]);
  grunt.registerTask( 'default', ['build']);


};