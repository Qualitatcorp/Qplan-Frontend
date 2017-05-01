module.exports = function(grunt) {
    
    grunt.initConfig({
        now : new Date().toISOString().replace(/(-|:|T)/g, "_"),
        pkg : grunt.file.readJSON('package.json'),
        // manifest: grunt.file.readJSON('manifest.json'),
        trabajador:grunt.file.readJSON('trabajador.json'),
        uglify: {
            build: {
                files : {
                  'build/trabajador/js/trabajador.modules.min.js' : '<%= trabajador.js.modules %>',
                  'build/trabajador/js/trabajador.vendors.min.js' : '<%= trabajador.js.vendors %>',
                  'build/trabajador/js/trabajador.app.min.js' : '<%= trabajador.js.app %>'
                  // 'build/js/scripts.min.js' : '<%= trabajador.js.scripts %>'
                }
            }
        },
        // injector: {                
        //     build: {
        //         options : {
        //             template : 'app/templates/index.tpl.html',
        //             destFile : 'index.html',
        //             postfix : '?v=<%= now %>'                   
        //         },
        //         files : {
        //             src : [
        //                 '../js/vendor.min.js', 
        //                 '../js/scripts.min.js',
        //                 '../css/vendor.min.css'
        //             ]
        //         }
        //     }
        // },
        cssmin : {
            build: {
                files: {
                  'build/trabajador/css/trabajador.min.css' : '<%= trabajador.css %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('trabajador', ['uglify', 'cssmin']);

};