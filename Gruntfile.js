// Обязательная обёртка
module.exports = function (grunt) {
    // Задачи
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        // CSS
        compass: {
            dev: {
                options: {
                    sassDir: 'scss',
                    cssDir: 'css',
                    imagesDir: 'img',
                    outputStyle: 'expanded',
                    noLineComments: true
                }
            }
        },
        autoprefixer: {
            prefixMe: {
                options: {
                    browsers: ["last 6 version", "> 1%", "ie 8"]
                },
                files: {
                    'css/style.min.css': ['css/style.css']
                }
            }
        },
        csso: {
            compress: {
                options: {
                    report: "min" // gzip or min it just report, not action
                },
                files: {
                    'css/style.min.css': ['css/style.min.css']
                }
            }
        },
        // Склеиваем
        concat: {
            main: {
                src: [
                    'src/js/**/*.js'  // Все JS-файлы и папки с ними в папке js
                ],
                dest: 'js/scripts.js'
            }
        },
        // Сжимаем
        uglify: {
            main: {
                files: {
                    // Результат задачи concat
                    'js/scripts.min.js': '<%= concat.main.dest %>'
                }
            }
        },
        watch: {
            // Перекомпиляция стилей при изменении scss-файлов
            compass: {
                files: ['scss/**/*.scss'],
                tasks: ['compass', 'autoprefixer', 'csso:compress']
            },
            // Пересобирание скриптов и запуск lint при изменении исходных js-файлов
            js: {
                files: ['js/**/*.js'],
                tasks: ['concat:main', 'uglify:main']
            }
        }
    });
    // Загрузка плагинов, установленных с помощью npm install
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks("grunt-csso");
    grunt.loadNpmTasks('grunt-autoprefixer');
    // Задача по умолчаниюc
    grunt.registerTask('default', ['compass', 'autoprefixer', 'csso:compress', 'watch:compass']);

};