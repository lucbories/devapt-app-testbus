
var buses_describe = undefined

var buses_elem = document.getElementById('id_buses')
var bus_input_elem = document.getElementById('id_bus_name')

var bus_channels_elem = document.getElementById('id_bus_channels')
var bus_channel_elem = document.getElementById('id_bus_channel')

var bus_recipients_elem = document.getElementById('id_bus_recipients')
var bus_recipient_elem = document.getElementById('id_bus_recipient')

var bus_payload_templates_elem = document.getElementById('id_bus_payload_templates')
var bus_payload_elem = document.getElementById('id_bus_payload')



// ------------------------------- BUSES -------------------------------

function fn_buses_clear()
{
	console.log('fn_buses_clear')

	while(buses_elem.firstChild)
	{
		buses_elem.removeChild(buses_elem.firstChild)
	}
	bus_input_elem.value = ''

	fn_bus_clear()
}

function fn_buses_update()
{
	console.log('fn_buses_update')

	fn_buses_clear()
	
	const msg_svc_promise = devapt_get_service('messaging')
	devapt_request_service(msg_svc_promise, 'devapt-msg-describe', undefined,
		function(response)
		{
			buses_describe = response.results
			var buses = Object.keys(buses_describe)
			buses.forEach(
				function(item)
				{
					var item_elem = document.createElement('option')
					item_elem.innerText = item
					buses_elem.appendChild(item_elem)
				}
			)

			fn_buses_select()
		}
	)
}

function fn_buses_select()
{
	// SELECT BUS
	var buses_selections = buses_elem.selectedOptions
	var buses_first_selection_elem = buses_selections.length > 0 ? buses_selections[0] : (buses_elem.options.length > 0 ? buses_elem.options[0] : undefined)
	if (! buses_first_selection_elem)
	{
		return
	}
	var bus_name = buses_first_selection_elem.innerText
	bus_input_elem.value = bus_name

	// CLEAR BUS
	fn_bus_clear()

	// FILL BUS
	fn_bus_update()
}



// ------------------------------- SELECTED BUS -------------------------------
function fn_bus_clear()
{
	fn_bus_channels_clear()
	fn_bus_recipients_clear()
}

function fn_bus_update()
{
	fn_bus_channels_update()
	fn_bus_recipients_update()
}


// ------------------------------- SELECTED BUS CHANNELS -------------------------------
function fn_bus_channels_update()
{
	if (! buses_describe)
	{
		return
	}

	var bus_name = bus_input_elem.value
	var bus_describe = buses_describe[bus_name]
	if (! bus_describe)
	{
		return
	}

	var bus_channels = bus_describe.channels
	bus_channels.forEach(
		function(item)
		{
			var item_elem = document.createElement('option')
			item_elem.innerText = item
			bus_channels_elem.appendChild(item_elem)
		}
	)
	fn_bus_channels_select()
}


function fn_bus_channels_clear()
{
	while(bus_channels_elem.firstChild)
	{
		bus_channels_elem.removeChild(bus_channels_elem.firstChild)
	}
	bus_channel_elem.value = ''
}

function fn_bus_channels_select()
{
	var bus_channels_selections = bus_channels_elem.selectedOptions
	var bus_channels_first_selection_elem = bus_channels_selections.length > 0 ? bus_channels_selections[0] : (bus_channels_elem.options.length > 0 ? bus_channels_elem.options[0] : undefined)
	if (! bus_channels_first_selection_elem)
	{
		return
	}
	var bus_channel_name = bus_channels_first_selection_elem.innerText
	bus_channel_elem.value = bus_channel_name
}


// ------------------------------- SELECTED BUS RECIPIENTS -------------------------------
function fn_bus_recipients_update()
{
	if (! buses_describe)
	{
		return
	}

	var bus_name = bus_input_elem.value
	var bus_describe = buses_describe[bus_name]
	if (! bus_describe)
	{
		return
	}

	var bus_recipients = bus_describe.recipients.page_values
	bus_recipients.forEach(
		function(item)
		{
			var item_elem = document.createElement('option')
			item_elem.innerText = item
			bus_recipients_elem.appendChild(item_elem)
		}
	)
	fn_bus_recipients_select()
}

function fn_bus_recipients_clear()
{
	while(bus_recipients_elem.firstChild)
	{
		bus_recipients_elem.removeChild(bus_recipients_elem.firstChild)
	}
	bus_recipient_elem.value = ''
}

function fn_bus_recipients_select()
{
	var bus_recipients_selections = bus_recipients_elem.selectedOptions
	var bus_recipients_first_selection_elem = bus_recipients_selections.length > 0 ? bus_recipients_selections[0] : (bus_recipients_elem.options.length > 0 ? bus_recipients_elem.options[0] : undefined)
	if (! bus_recipients_first_selection_elem)
	{
		return
	}
	var bus_recipient_name = bus_recipients_first_selection_elem.innerText
	bus_recipient_elem.value = bus_recipient_name
}


// ------------------------------- SELECTED BUS PAYLOAD -------------------------------
function fn_bus_payload_templates_select()
{
	var bus_payload_templates_selections = bus_payload_templates_elem.selectedOptions
	var bus_payload_templates_first_selection_elem = bus_payload_templates_selections.length > 0 ? bus_payload_templates_selections[0] : (bus_payload_templates_elem.options.length > 0 ? bus_payload_templates_elem.options[0] : undefined)
	if (! bus_payload_templates_first_selection_elem)
	{
		return
	}
	var bus_payload_name = bus_payload_templates_first_selection_elem.innerText

	var ts = Date.now()
	switch(bus_payload_name) {
		case 'Logs':
			bus_payload_elem.value = `
			{
				"timestamp":"${ts}",
				"source":"browser-messaging.html",
				"level":"info",
				"values":[
					"text1", "text2"
				]
			}
			`
			break

		case 'Default':
		default:
			bus_payload_elem.value = '{ "timestamp":"${ts}", "datas":[] }'
			break
	}
}


function fn_bus_send()
{
	var bus = bus_input_elem.value
	var channel = bus_channel_elem.value
	var target = bus_recipient_elem.value

	var payload_str = bus_payload_elem.value
	var payload = payload_str && payload_str != '' ? JSON.parse(payload_str) : {}
	
	var operands = [bus, channel, target, payload]

	const msg_svc_promise = devapt_get_service('messaging')
	devapt_request_service(msg_svc_promise, 'devapt-msg-send', operands,
		function(response)
		{
			// const results = response.results
			// console.log('devapt-msg-send', results)

			document.getElementById('id_bus_response').innerText = JSON.stringify(response)
		}
	)
}



// ------------------------------- MESSAGES -------------------------------
function get_out_message(arg_id)
{
	function fn_out_message(arg_response)
	{
		console.log('call:fn_out_message:id=' + arg_id, arg_response)

		// GET LOGS
		if (! arg_response || ! arg_response.datas || ! arg_response.datas.is_distributed_message )
		{
			// console.error('fn_out_message:Messages out element bad response object', arg_response)
			return
		}
		var datas = arg_response.datas

		// GET TABLE
		var messages_element = document.getElementById(arg_id)
		if (! messages_element)
		{
			console.error('fn_out_message:Messages out element not found with id=[%s]', arg_id)
			return
		}
		var messages_tbody_element = messages_element.children[1]
		if (! messages_tbody_element)
		{
			console.error('fn_out_message:Messages tbody out element not found with id=[%s]', arg_id)
			return
		}

		// FILL MESSAGE
		var row_element = messages_tbody_element.insertRow(0)

		var element_0 = row_element.insertCell(0)
		element_0.innerHTML = 'messages'

		var element_1 = row_element.insertCell(1)
		element_1.innerHTML = datas._channel

		var element_2 = row_element.insertCell(2)
		element_2.innerHTML = datas._sender

		var element_3 = row_element.insertCell(3)
		element_3.innerHTML = JSON.stringify(datas._payload)
	}

	return fn_out_message
}


window.devapt().on_runtime_created(
	function()
	{
		// SERVICES HELPERS
		window.devapt_get_service = window.devapt().get_service
		window.devapt_subscribe_service = window.devapt().subscribe_service
		window.devapt_request_service = window.devapt().request_service

		const msg_svc_promise = devapt_get_service('messaging')

		devapt_request_service(msg_svc_promise, 'devapt-msg-describe', undefined,
			function(response)
			{
				buses_describe = response.results
				fn_buses_update()
			}
		)

		devapt_subscribe_service(msg_svc_promise, ['messages', 'default'],
			function(response)
			{
				console.log('messaging:devapt-msg-subscription', response)
				get_out_message('id_messages')(response)
			},
			'devapt-msg-subscribe', 'devapt-msg-subscription'
		)

		var session_uid_elem = document.getElementById('id_session_uid')
		session_uid_elem.innerHTML = window.devapt().runtime().get_session_uid()
	}
)