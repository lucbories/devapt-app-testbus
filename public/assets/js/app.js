
// SERVICES
var ping_svc_cfg = undefined
var topology_svc_cfg = undefined
var logs_svc_cfg = undefined



function get_out_log(arg_id)
{
	function fn_out_log(arg_response)
	{
		console.log('call:fn_out_log:id=' + arg_id, arg_response)

		// GET LOGS
		if (! arg_response || ! arg_response.datas || ! arg_response.datas.logs )
		{
			console.error('Logs out element bad response object', arg_response)
			return
		}
		var datas = arg_response.datas

		// GET TABLE
		var logs_element = document.getElementById(arg_id)
		if (! logs_element)
		{
			console.error('Logs out element not found with id=[%s]', arg_id)
			return
		}

		// LOOP ON LOGS
		datas.logs.forEach(
			function(log_record)
			{

				var row_element = logs_element.insertRow(0)

				var ts_element = row_element.insertCell(0)
				ts_element.innerHTML = log_record[0]

				var level_element = row_element.insertCell(1)
				level_element.innerHTML = datas.level

				var type_element = row_element.insertCell(2)
				type_element.innerHTML = datas.source

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



function get_out_ping(arg_id, arg_prefix='PingPong')
{
	function fn_out_ping()
	{
		var ts = window.performance.now()
		var out_text = arg_prefix + ' at ' + ts + '\n'
		var out_element = document.getElementById(arg_id)
		if (! out_element)
		{
			console.error('Ping out element not found with id=[%s]', arg_id)
			return
		}
		out_element.textContent += out_text
	}
	return fn_out_ping
}



window.devapt().on_runtime_created(
	function()
	{
		console.log('runtime ready: application script')
	}
)