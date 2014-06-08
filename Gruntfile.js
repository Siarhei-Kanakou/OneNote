module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	
	grunt.initConfig({
		copy: {
			files: {
				expand: true,
				cwd: 'src/',
				src: '*.html',
				dest: 'build/',
				filter: 'isFile'
			}
		},
		stylus: {
			compile: {
				files: {
					'build/css/style.css' : ['src/css/*.styl']
				}
			}
		}
	});
	
	grunt.registerTask('default', ['copy', 'stylus']);
};
