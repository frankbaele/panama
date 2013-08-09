
module.exports = function (grunt) {
  "use strict";

  // Config...
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      prod: {
        options: {
          file: './server/js/game.js'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          // Prevents Grunt to close just after the task (starting the server) completes
          // This will be removed later as `watch` will take care of that
          keepalive: true,
          hostname:''
        }
      }
    },
    open: {
      all: {
        path: 'http://localhost:9001'
      }
    }
  });


  // Load tasks...
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-nodemon');

  // Task aliases and tasks
  grunt.registerTask('server', [
    'nodemon'
  ]);
  grunt.registerTask('client', [
    'open',
    'connect'
  ]);

};
