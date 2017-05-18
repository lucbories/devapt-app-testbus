
// SERVICES
var ping_svc_cfg = undefined
var topology_svc_cfg = undefined
var logs_svc_cfg = undefined


window.devapt().on_runtime_created(
	function()
	{
		console.log('runtime ready for application script')

		// SERVICES HELPERS
		window.devapt_get_service = window.devapt().get_service
		window.devapt_subscribe_service = window.devapt().subscribe_service
		window.devapt_request_service = window.devapt().request_service
	}
)