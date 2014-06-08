module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.initConfig({
		clean: {
			build: ["build"]	
		},
		copy: {
			files: {
				expand: true,
				cwd: 'src/',
				src: '*.html',
				dest: 'build/',
				filter: 'isFile'
			}
		},
		jshint: {
			all: ['src/scripts/*.js']
		},
		stylus: {
			compile: {
				files: {
					'build/app.css' : ['src/css/*.styl']
				}
			}
		},
		uglify: {
			my_target: {
				files: {
					'build/app.js': ['src/scripts/*.js']
				}
			}
		}
	});
	
	grunt.registerTask('default', ['clean', 
								   'copy',
								   'stylus',
								   'jshint',
								   'uglify']);
};
