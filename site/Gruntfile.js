/**
 * grunt.js, April 28, 2014
 *
 * Copyright 2014 fenbi.com. All rights reserved.
 * FENBI.COM PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

/**
 * @author tianbaoming <tianbaoming@fenbi.com>
 */

module.exports = function (grunt) {
    'use strict';

    var SOURCE = 'view/';
    var BUILD = 'dist/';

    grunt.initConfig({
        less: {
            development: {
                files: [{
                    expand: true,
                    cwd: SOURCE,
                    src: ['**/bootstrap/*.less'],
                    dest: BUILD,
                    ext: '.css'
                }]
            }
        },
        browserify: {
            development: {
                files: [{
                    expand: true,
                    cwd: SOURCE,
                    src: '**/bootstrap/*.js',
                    dest: BUILD,
                    bundleOptions: {
                        debug: true
                    }
                }]
            },
            build: {
                files: [{
                    expand: true,
                    cwd: SOURCE,
                    src: '**/bootstrap/*.js',
                    dest: BUILD
                }]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
				reporterOutput: "",
            },
            all: [SOURCE + '**/*.js', '!' + SOURCE + '**/vendor/**/*.*']
        },
        clean: [
            BUILD
        ],
        uglify: {
            options: {
                compress: {
                    warnings: false
                }
            },
            build: {
                files: [{
                    expand: true,
                    src: ['**/*.js'],
                    dest: BUILD,
                    cwd: BUILD
                }]
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: BUILD,
                src: '**/*.css',
                dest: BUILD,
                ext: '.css'
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    src: [
                        '*.html',
                        'page/*.html',
                        'images/*',
                        'images/pens/*.*',
                        'javascript/truman-engine.js',
                        'vendor/**/*.*',
                        'layout/*.html',
                        'template/*.html',
                        'dialog/*.html',
                        'component/*.html'
                    ],
                    dest: BUILD,
                    cwd: SOURCE
                }]
            }
        },
        watch: {
            development: {
                files: [
                    '**/*.js',
                    '**/*.less',
                    '**/*.html'
                ],
                tasks: [
                    'jshint',
                    'browserify:development',
                    'less:development',
                    'copy'
                ],
                options: {
                    cwd: SOURCE
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('development', [
        'jshint',        
        'less:development',
		'browserify:development',
		'copy',
        'watch:development'
    ]);

    grunt.registerTask('build', [
        'clean',
        'jshint',
        'less:development',
        'browserify:build',
        'copy',
        'uglify:build',
        'cssmin:minify',
    ]);
};
