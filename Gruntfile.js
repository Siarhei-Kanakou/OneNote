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
				src: 'index.html',
				dest: 'build/',
				filter: 'isFile'
			}
		},
		jshint: {
			all: [
				'src/scripts/*.js',
				'src/scripts/model/*.js',
				'src/scripts/controller/*.js',
				'src/scripts/view/*.js'
			]
		},
		stylus: {
			compile: {
				files: {
					'build/css/style.css' : ['src/css/*.styl']
				}
			}
		},
		uglify: {
			target: {
				files: {
					'build/scripts/app.js': [
						'src/scripts/Application.js',
						'src/scripts/model/*.js',
						'src/scripts/controller/*.js',
						'src/scripts/view/*.js'
					]
				}
			}
		}
	});
	
	grunt.registerTask('default', [
		'clean',
		'copy',
		'stylus',
		'jshint',
		'uglify'
	]);
};