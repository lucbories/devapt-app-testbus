

var logs_are_enabled = false


function get_out_log(arg_id)
{
	function fn_out_log(arg_response)
	{
		console.log('call:fn_out_log:id=' + arg_id, arg_response)

		// CHECK RESPONSE
		if (! arg_response || ! arg_response.results )
		{
			console.error('Logs out element: bad response object', arg_response)
			return
		}
		// CHECK RESPONSE RESULTS
		if ( arg_response.results.length == 0 )
		{
			return
		}
		if ( arg_response.results.length < 2 || arg_response.results[0] != 'done' )
		{
			console.error('Logs out element: bad response results, should be ["done", [logs_records] ]', arg_response.results)
			return
		}
		var logs_records = arg_response.results[1]

		// GET TABLE
		var logs_element = document.getElementById(arg_id)
		if (! logs_element)
		{
			console.error('fn_out_log:Logs out element not found with id=[%s]', arg_id)
			return
		}
		var logs_tbody_element = logs_element.children[1]
		if (! logs_tbody_element)
		{
			console.error('fn_out_log:Logs tbody out element not found with id=[%s]', arg_id)
			return
		}

		// LOOP ON LOGS
		logs_records.forEach(
			function(log_record)
			{
				var row_element = logs_tbody_element.insertRow(0)

				var ts_element = row_element.insertCell(0)
				ts_element.innerHTML = log_record[0]

				var level_element = row_element.insertCell(1)
				level_element.innerHTML = logs_records.level

				var type_element = row_element.insertCell(2)
				type_element.innerHTML = logs_records.source

				var context_element = row_element.insertCell(3)
				context_element.innerHTML = log_record[1]

				var source_element = row_element.insertCell(4)
				source_element.innerHTML = log_record[2]

				var log_element = row_element.insertCell(5)
				log_element.innerHTML = log_record[5]
			}
		)
	}
	return fn_out_log
}


function fn_enable_logs()
{
	console.log('call:fn_enable_logs')
	if (logs_are_enabled)
	{
		return
	}
	logs_are_enabled = true

	var logs_svc_promise = devapt_get_service('logs', logs_svc_cfg)
	devapt_request_service(logs_svc_promise, 'devapt-subscribe', undefined)
	devapt_subscribe_service(logs_svc_promise, undefined, get_out_log('logs') )
}

function fn_disable_logs()
{
	console.log('call:fn_disable_logs')
	if (! logs_are_enabled)
	{
		return
	}
	var logs_svc_promise = devapt_get_service('logs', logs_svc_cfg)
	logs_svc_promise.then(
		function(svc)
		{
			svc['devapt-subscribe'].unsubscribes.forEach(
				function(unsubscribe)
				{
					unsubscribe()
				}
			)
		}
	)
	logs_are_enabled = false
}
