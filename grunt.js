/**
 * Created with JetBrains WebStorm.
 * Author: Igor Zalutsky
 * Date: 17.08.12
 * Time: 11:56
 */

// Globals for JSHint

module.exports = function(grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({
        lint: {
            all: ['grunt.js', 'www/js/index.js']
        },
        jshint: {
            options: {
                strict: true,           // strict mode
                browser: true,          // browser environment
                devel: true,            // console, alert, etc
                jquery: true,           // jQuery
                bitwise: true,          // no bitwise operators
                camelcase: true,        // only camelCase and UNDER_SCORE
                curly: true,            // no "braceless" loops
                eqeqeq: true,           // no casting comparisons
                forin: true,            // for..in loops with hasOwnProperty() check
                immed: true,            // no immediate function invokation
                indent: 4,              // tab width
                latedef: true,          // no variable usage before definition
                newcap: true,           // capitalized constructors
                noarg: true,            // no arguments.caller and arguments.callee
                noempty: true,          // no empty blocks
                nonew: true,            // no constructor invokation without assigning
                plusplus: true,         // no ++ and --
                quotmark: true,         // consistency of quote style
                regexp: true,           // no unsafe . in regexps
                undef: true,            // no explicitly undefined variables
                unused: true,           // no unused variables
                trailing: true          // no spaces after / in multiline strings
            },
            globals: {
                module: true,
                Backbone: true,
                _: true,
                Handlebars: true
            }
        }
    });

    // Default task.
    grunt.registerTask('default', 'lint');

};