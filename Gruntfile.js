
module.exports = function (grunt) {
  "use strict";
  var neat = require('node-neat').includePaths;
  // Config...
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9001,
          // Prevents Grunt to close just after the task (starting the server) completes
          // This will be removed later as `watch` will take care of that
          keepalive: false,
          hostname: '',
          base: './src'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['./src/scripts/**/*.js']
      },
      html:{
        files: ['./src/**/*.html']
      },
      pictures:{
        files: ['./src/art/**/*']
      },
      css:{
        files: ['./src/sass/**/*.scss'],
        tasks: ['compass:dev']
      }
    },
    sass: {
      options: {
        includePaths: neat,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          './dist/css/style.css': './src/sass/style.scss'
        }
      }
    },
    copy: {
      art: {
        expand: true,
        cwd: 'src/art',
        src: '**',
        dest: 'dist/art',
        flatten: false,
        filter: 'isFile'
      },
      html:{
        expand: true,
        cwd: 'src',
        src: 'index.html',
        dest: 'dist',
        flatten: false,
        filter: 'isFile'
      }
    },
    requirejs: {
      compile: {
        options: {
          name: 'scripts/application/game',
          baseUrl: "src/",
          mainConfigFile: "src/config/requireConfig.js",
          out: "dist/scripts/game.js"
        }
      }
    }
  });


  // Load tasks...
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-requirejs');
  // Task aliases and tasks
  grunt.registerTask('server', [
    'connect',
    'watch'
  ]);
  grunt.registerTask('build', [
    'copy',
    'sass',
    'requirejs'
  ]);
};
