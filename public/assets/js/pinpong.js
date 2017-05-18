
function get_out_ping(arg_id, arg_label)
{
	return function fn_out_ping(arg_response)
	{
		// console.log('call:fn_out_ping:id=' + arg_id, arg_response)

		// var datas = arg_response.datas

		// GET ELEMENT
		var element = document.getElementById(arg_id)
		if (! element)
		{
			console.error('fn_out_ping:Out element not found with id=[%s]', arg_id)
			return
		}

		element.value = element.value + '\n' + arg_label + ':' + Date.now()
	}
}


function fn_ping(arg_target)
{
	// console.log('call:fn_ping')
	get_out_ping('id_out_ping_' + arg_target, 'Ping emitted')()
	var ping_svc_promise = devapt_get_service('pingpong', ping_svc_cfg)
	devapt_request_service(ping_svc_promise, 'devapt-ping', { target:arg_target }, get_out_ping('id_out_ping_' + arg_target, 'Pong received'))
}


function fn_ping_master()
{
	fn_ping('master')
}


function fn_ping_node_a()
{
	fn_ping('node_a')
}


function fn_ping_node_b()
{
	fn_ping('node_b')
}


function fn_ping_node_c()
{
	fn_ping('node_c')
}
