module.exports = function (grunt) {
    "use strict";
    var neat = require('node-neat').includePaths;
    // Config...
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nodemon: {
            dev:{
                script: 'server.js'
            }
        },
        watch: {
            options: {
                livereload: false,
            },
            scripts: {
                files: ['./src/scripts/**/*.js']
            },
            html: {
                files: ['./src/**/*.html']
            },
            pictures: {
                files: ['./src/art/**/*']
            },
            css: {
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
                src: '*',
                dest: 'dist/art',
                flatten: false,
                filter: 'isFile'
            },
            maps: {
                expand: true,
                cwd: 'src/maps',
                src: '**',
                dest: 'dist/maps',
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
        bowerRequirejs: {
            dev: {
                rjsConfig: 'src/config/requireConfig.js',
                options: {
                    exclude: ['requirejs']
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    name: 'scripts/app',
                    baseUrl: "src",
                    mainConfigFile: "src/config/requireConfig.js",
                    findNestedDependencies: true,
                    out: "dist/scripts/app.js",
                    optimize: 'uglify2',
                    uglify2: {
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
                        mangle: true
                    }
                }
            }
        }
    });

    // Load tasks...
    grunt.loadNpmTasks('grunt-bower');
    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-nodemon');

    // Task aliases and tasks
    grunt.registerTask('server', [
        'connect',
        'watch'
    ]);
    grunt.registerTask('build', [
        'copy',
        'requirejs'
    ]);
};
