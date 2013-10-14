
module.exports = function (grunt) {
  "use strict";

  // Config...
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      prod: {
        options: {
          file: './src/server/js/game.js'
        }
      }
    },
    nodewebkit: {
      server: {
        options: {
          build_dir: './dist/server', // Where the build version of my node-webkit app is saved
          mac: true, // We want to build it for mac
          win: true, // We want to build it for win
          linux32: false, // We don't need linux32
          linux64: false // We don't need linux64
        }
      }
    }
  });


  // Load tasks...
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-node-webkit-builder');

  // Task aliases and tasks
  grunt.registerTask('serve', [
    'nodemon'
  ]);
  grunt.registerTask('build', [
    'nodewebkit'
  ]);

};
