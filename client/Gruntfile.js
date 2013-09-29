
module.exports = function (grunt) {
  "use strict";

  // Config...
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9001,
          // Prevents Grunt to close just after the task (starting the server) completes
          // This will be removed later as `watch` will take care of that
          keepalive: true,
          hostname: '',
          base: './src'
        }
      }
    },
    open: {
      all: {
        path: 'http://localhost:9001'
      }
    },
    nodewebkit: {
      options: {
        build_dir: './dist', // Where the build version of my node-webkit app is saved
        mac: true, // We want to build it for mac
        win: true, // We want to build it for win
        linux32: false, // We don't need linux32
        linux64: false // We don't need linux64
      },
      src: ['./src/**/*'] // Your node-wekit app
    }
  });


  // Load tasks...
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-node-webkit-builder');

  // Task aliases and tasks
  grunt.registerTask('serv', [
    'open',
    'connect'
  ]);
  grunt.registerTask('build', [
    'nodewebkit'
  ]);

};
