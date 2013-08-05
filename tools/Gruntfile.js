module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    gitinfo:{},

    copy:{
      main:{
        files:[{ 
          expand: true,
          cwd: '../build', 
          src: ['**'], 
          dest: '../versions/<%= gitinfo.local.branch.current.shortSHA %>'
        }]
      }
    },

    "gh-pages": {
      ".": [ '../index.html' ]
    }

  });

  grunt.registerTask("index", "Updates index", function ( prop, cwd, tits ) {

    var versionfile = grunt.file.readJSON( "../versions.json" );
    var sha = grunt.config( "gitinfo" ).local.branch.current.shortSHA;
    versionfile[sha] = "/versions/" + sha;
    grunt.file.write( "../versions.json", JSON.stringify( versionfile ));
   
  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gitinfo');

  // Default task(s).
  grunt.registerTask('default', ['gitinfo', 'index', 'copy', 'gh-pages']);


};