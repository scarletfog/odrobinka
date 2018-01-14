module.exports = function(grunt) {

    // Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'tmp/styles.css': './src/sass/custom.scss'
                }
            }
        },
        cssmin: {
            production: {
                expand: false,
                files: {
                    "css/styles.min.css" : "./tmp/styles.css"
                }
            }
        },
        concat: {
            basic: {
                src: [
                    "./node_modules/materialize-css/dist/js/materialize.min.js"
                ],
                dest: 'tmp/scripts.js',
            },
        },
        uglify: {
            vendorjs: {
                src: './tmp/scripts.js',
                dest: 'js/scripts.min.js'
            },
            appjs: {
                src: './src/js/app.js',
                dest: 'js/app.min.js'
            },
        },
        clean: {
            dev: {
                src: './tmp'
            }
        },
        watch: {
            sass: {
                files: ['./src/sass/**/*'],
                tasks: ['sass', 'cssmin', 'clean']
            },
            concat: {
                files: ['./src/js/app.js'],
                tasks: ['concat', 'uglify', 'clean']
            }
        }
    });

    // Plugins
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Tasks
    grunt.registerTask('default', ['sass', 'concat', 'cssmin:production', 'uglify', 'clean', 'watch']);
    grunt.registerTask('build', ['sass', 'concat', 'uglify', 'cssmin:production', 'clean', 'watch']);
};
