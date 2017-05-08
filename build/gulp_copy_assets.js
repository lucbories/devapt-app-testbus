
'use strict'

var SRC_FILE_BOOTSTRAP_JS  = 'node_modules/devapt-core-common/public/js/devapt-bootstrap.js'
var SRC_FILE_BROWSER_JS  = 'node_modules/devapt-core-browser/public/js/build/devapt-core-browser.js'
var SRC_FILE_BROWSER_MAP  = SRC_FILE_BROWSER_JS + '.map'
var SRC_FILES_JS = [SRC_FILE_BOOTSTRAP_JS, SRC_FILE_BROWSER_JS, SRC_FILE_BROWSER_MAP]
var DST_DIR_JS  = 'public/assets/js'


// var SRC_FILE_NORMALIZE_CSS  = 'node_modules/devapt-core-common/public/css/normalize.css'
// var SRC_FILES_CSS = [SRC_FILE_BOOTSTRAP_JS, SRC_FILE_BROWSER_JS, SRC_FILE_BROWSER_MAP]
// var DST_DIR_CSS  = 'public/assets/css'


module.exports = function (gulp, plugins, arg_task_name)
{
	gulp.task(arg_task_name,
		() => {
			return gulp.src(SRC_FILES_JS)
				.pipe( gulp.dest(DST_DIR_JS) )
		}
	)
}

