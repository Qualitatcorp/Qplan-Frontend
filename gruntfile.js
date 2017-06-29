module.exports = function(grunt) {
    
    grunt.initConfig({
        now : Date.now(),
        pkg : grunt.file.readJSON('package.json'),
        // manifest: grunt.file.readJSON('manifest.json'),
        src:grunt.file.readJSON('resources.json'),
        uglify: {
            options: {
              banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> - for Ruben Tejeda*/\n'
            },
            trabajador: {
                files : {
                  'build/trabajador/js/modules.min.js' : '<%= src.trabajador.js.modules %>',
                  'build/trabajador/js/vendors.min.js' : '<%= src.trabajador.js.vendors %>',
                  'build/trabajador/js/app.min.js' : '<%= src.trabajador.js.app %>'
                }
            },
            admin: {
                files : {
                  'build/admin/js/modules.min.js' : '<%= src.admin.js.modules %>',
                  'build/admin/js/vendors.min.js' : '<%= src.admin.js.vendors %>',
                  'build/admin/js/app.min.js' : '<%= src.admin.js.app %>'
                }
            },
            do: {
                files : {
                  'build/do/js/modules.min.js' : '<%= src.do.js.modules %>',
                  'build/do/js/vendors.min.js' : '<%= src.do.js.vendors %>',
                  'build/do/js/app.min.js' : '<%= src.do.js.app %>'
                }
            }
        },
        injector: {                
            trabajador: {
                options : {
                    template : 'build/trabajador.tpl',
                    destFile : 'build/trabajador/index.html',
                    postfix : '?v=<%= now %>'                   
                },
                files : {
                    src : [
                        'build/trabajador/js/*.js',
                        'build/trabajador/css/*.css'
                    ]
                }
            },                
            admin: {
                options : {
                    template : 'build/admin.tpl',
                    destFile : 'build/admin/index.html',
                    postfix : '?v=<%= now %>'                   
                },
                files : {
                    src : [
                        'build/admin/js/*.js',
                        'build/admin/css/*.css'
                    ]
                }
            },                
            do: {
                options : {
                    template : 'build/do.tpl',
                    destFile : 'build/do/index.html',
                    postfix : '?v=<%= now %>'                   
                },
                files : {
                    src : [
                        'build/do/js/*.js',
                        'build/do/css/*.css'
                    ]
                }
            }
        },
        cssmin : {
            trabajador: {
                files: {
                  'build/trabajador/css/style.min.css' : '<%= src.trabajador.css %>'
                }
            },
            admin: {
                files: {
                  'build/admin/css/style.min.css' : '<%= src.admin.css %>'
                }
            },
            do: {
                files: {
                  'build/do/css/style.min.css' : '<%= src.do.css %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('trabajador', ['uglify:trabajador', 'cssmin:trabajador','injector:trabajador']);
    grunt.registerTask('admin', ['uglify:admin', 'cssmin:admin','injector:admin']);
    grunt.registerTask('do', ['uglify:do', 'cssmin:do','injector:do']);
    grunt.registerTask('default', ['uglify', 'cssmin','injector']);

};