
function get_out_ping(arg_target, arg_id, arg_label)
{
	return function fn_out_ping(arg_response)
	{
		console.log('call:fn_out_ping:id=' + arg_id, arg_response)

		if (arg_response && arg_response.results.length >= 2)
		{
			if (arg_response.results[0] != 'devapt-pong')
			{
				return
			}
			if (arg_response.results[1] != arg_target)
			{
				return
			}
		}

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
	get_out_ping(arg_target, 'id_out_ping_' + arg_target, 'Ping emitted')()
	var ping_svc_promise = devapt_get_service('pingpong', ping_svc_cfg)
	devapt_request_service(ping_svc_promise, 'devapt-ping', arg_target, get_out_ping(arg_target, 'id_out_ping_' + arg_target, 'Pong received'))
}


function fn_ping_master()
{
	fn_ping('master')
}


function fn_ping_node_a()
{
	fn_ping('NodeA')
}


function fn_ping_node_b()
{
	fn_ping('NodeB')
}


function fn_ping_node_c()
{
	fn_ping('NodeC')
}


window.devapt().on_runtime_created(
	function()
	{
		// SERVICES HELPERS
		window.devapt_get_service = window.devapt().get_service
		window.devapt_subscribe_service = window.devapt().subscribe_service
		window.devapt_request_service = window.devapt().request_service

		const msg_svc_promise = devapt_get_service('messaging')

		devapt_subscribe_service(msg_svc_promise, ['messages', 'default'],
			function(response)
			{
				console.log('messaging:devapt-msg-subscription', response)
			},
			'devapt-msg-subscribe', 'devapt-msg-subscription'
		)

		var session_uid_elem = document.getElementById('id_session_uid')
		session_uid_elem.innerHTML = window.devapt().runtime().get_session_uid()
	}
)
