
'use strict'

var SRC_FILE_BOOTSTRAP_JS  = 'node_modules/devapt-core-common/public/js/devapt-bootstrap.js'
var SRC_FILE_BROWSER_JS  = 'node_modules/devapt-core-browser/public/js/build/devapt-core-browser.js'
var SRC_FILE_BROWSER_MAP  = SRC_FILE_BROWSER_JS + '.map'
var SRC_FILES = [SRC_FILE_BOOTSTRAP_JS, SRC_FILE_BROWSER_JS, SRC_FILE_BROWSER_MAP]



module.exports = function (gulp, plugins, arg_task_name, arg_operands)
{
	gulp.task(arg_task_name,
		() => {
			return gulp.watch(SRC_FILES, gulp.series(arg_operands ? arg_operands : 'default') )
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
}
