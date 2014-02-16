
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
          base: './dist'
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
        tasks: ['sass:dev']
      }
    },
    sass: {
      options: {
        includePaths: neat,
        outputStyle: 'compressed'
      },
      dev: {
        files: {
          './src/css/style.css': './src/sass/style.scss'
        }
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
      vendor: {
        expand: true,
        cwd: 'src/scripts/vendor',
        src: '**',
        dest: 'dist/scripts/vendor',
        flatten: false,
        filter: 'isFile'
      },
      templates: {
        expand: true,
        cwd: 'src/templates',
        src: '**',
        dest: 'dist/templates',
        flatten: false,
        filter: 'isFile'
      },
      requireConfig: {
        expand: true,
        cwd: 'src/config',
        src: 'requireLiveConfig.js',
        dest: 'dist/config',
        flatten: false,
        filter: 'isFile'
      }
    },
    requirejs: {
      compile: {
        options: {
          name: 'scripts/app',
          baseUrl: "src",
          mainConfigFile: "src/config/requireConfig.js",
          out: "dist/scripts/app.js",
          optimize: 'uglify2',
          exclude: ['jQuery', 'underscore', 'text', 'keypress', 'angular', 'angular-ui-router'],
          uglify2: {
            //Example of a specialized config. If you are fine
            //with the default options, no need to specify
            //any of these properties.
            output: {
              beautify: false
            },
            compress: {
              sequences: false,
              global_defs: {
                DEBUG: false
              }
            },
            warnings: true,
            mangle: false
          }
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
