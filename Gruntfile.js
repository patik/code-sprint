/* global module:false */
module.exports = function(grunt) {
    var port = grunt.option('port') || 8000;

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner:
                '/*!\n' +
                ' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
                ' * http://lab.hakim.se/reveal-js\n' +
                ' * MIT licensed\n' +
                ' *\n' +
                ' * Copyright (C) 2013 Hakim El Hattab, http://hakim.se\n' +
                ' */'
        },

        uglify: {
            options: {
                banner: '<%= meta.banner %>\n'
            },
            reveal: {
                src: 'js/reveal.js',
                dest: 'js/reveal.min.js'
            },
            revealConfig: {
                src: 'js/reveal.config.js',
                dest: 'js/reveal.config.min.js'
            }
        },

        cssmin: {
            compress: {
                files: {
                    'css/reveal.min.css': [ 'css/reveal.css' ],
                    'css/custom/pre.css': [ 'css/custom/pre.src.css' ],
                    'css/custom/post.css': [ 'css/custom/post.src.css' ]
                }
            }
        },

        sass: {
            main: {
                files: {
                    'css/theme/night.css': 'css/theme/source/night.scss',
                    'css/custom/pre.src.css': 'css/custom/pre.scss',
                    'css/custom/post.src.css': 'css/custom/post.scss'
                }
            }
        },

        jshint: {
            options: {
                curly: false,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                expr: true,
                globals: {
                    head: false,
                    module: false,
                    console: false,
                    unescape: false
                }
            },
            files: [ 'Gruntfile.js', 'js/reveal.js', 'js/reveal.config.js' ]
        },

        connect: {
            server: {
                options: {
                    port: port,
                    base: '.'
                }
            }
        },

        watch: {
            main: {
                files: [ 'Gruntfile.js', 'js/reveal.js', 'js/reveal.config.js', 'css/reveal.css', 'css/custom/*.scss' ],
                tasks: 'default'
            },
            theme: {
                files: [ 'css/theme/source/*.scss', 'css/theme/template/*.scss' ],
                tasks: 'themes'
            }
        },

        concat: {
            options: {},
            css: {
                src: ['css/custom/pre.css', 'css/reveal.min.css', 'css/theme/night.css', 'css/custom/post.css'],
                dest: 'css/style.css',
            },
            js: {
                src: ['lib/js/head.min.js', 'js/reveal.min.js', 'js/reveal.config.min.js'],
                dest: 'js/script.js',
            }
        }
    });

    // Dependencies
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );

    // Default task
    grunt.registerTask( 'default', [ 'sass', 'cssmin', 'jshint', 'uglify', 'concat' ] );

    // Theme task
    grunt.registerTask( 'themes', [ 'sass', 'cssmin', 'concat' ] );

    // Serve presentation locally
    grunt.registerTask( 'serve', [ 'connect', 'watch' ] );

    // Run tests
    grunt.registerTask( 'test', [ 'jshint' ] );
};
