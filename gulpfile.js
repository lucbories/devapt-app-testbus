
'use strict'

var gulp = require('gulp')
var del = require('del')

var SRC_JS_FILES = 'src/js/**/*.js'
var DST_JS_DIR = 'dist/js'

var plugins = require('gulp-load-plugins')( { DEBUG:false } )

var clean_function = () => {
	return del(DST_JS_DIR)
}

function getTask(arg_file_name, arg_task_name, arg_operands)
{
	console.log('loading task [%s] from file [%s]', arg_task_name, arg_file_name)
	return require('./build/' + arg_file_name)(gulp, plugins, arg_task_name, arg_operands)
}



// **************************************************************************************************
// DEVAPT APP TESTBUS
// **************************************************************************************************
// getTask('gulp_src_js_transpile', 'src_js_transpile')
getTask('gulp_copy_assets',  'copy_assets')
getTask('gulp_watch_assets', 'watch_assets', 'copy_assets')

gulp.task('watch',
	() => {
		gulp.watch(SRC_JS_FILES, gulp.series('default') )
		.on('change',
			(path/*, stats*/) => {
				console.log('File ' + path + ' was changed, running task watch...')	
			}
		)
		.on('unlink',
			(path/*, stats*/) => {
				console.log('File ' + path + ' was deleted, running task watch...')	
			}
		)
	}
)

gulp.task('default', gulp.series('copy_assets'/*, 'src_js_transpile'*/) )
gulp.task('clean', clean_function)
gulp.task('rebuild', gulp.series('clean', 'default') )
