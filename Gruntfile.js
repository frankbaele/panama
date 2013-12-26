
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
    compass: {
      dev: {
        options: {
          sassDir: './src/sass',
          cssDir: './src/css'
        }
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: '**',
        dest: 'dist/',
        flatten: false,
        filter: 'isFile'
      }
    }
  });


  // Load tasks...
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Task aliases and tasks
  grunt.registerTask('server', [
    'connect',
    'watch'
  ]);
  grunt.registerTask('build', [
    'copy'
  ]);
};
