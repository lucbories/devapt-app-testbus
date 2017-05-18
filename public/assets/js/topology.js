
function fn_topology_out(arg_id)
{
	return function(arg_response){
		console.log('fn_topology_out:response results', arg_response.results)
		
		// GET DATAS
		if (! arg_response || ! arg_response.results )
		{
			console.error('fn_topology_out:bad response object', arg_response)
			return
		}
		var datas = arg_response.results

		// GET ELEMENT
		var textarea_element = document.getElementById(arg_id)
		if (! textarea_element)
		{
			console.error('fn_topology_out:bad textarea element with id=[%s]', arg_id)
			return
		}

		// SET VALUE
		textarea_element.value = JSON.stringify(datas)
	}
}

function fn_topology_tenants_names()
{
	console.log('call:fn_topology_tenants_names')
	var svc_promise = devapt_get_service('topology', topology_svc_cfg)
	devapt_request_service(svc_promise, "devapt-deployed-tenants-names", undefined, fn_topology_out('id_out_topology_tenants_names') )
}

function fn_topology_tenants_infos()
{
	console.log('call:fn_topology_tenants_infos')
	var svc_promise = devapt_get_service('topology', topology_svc_cfg)
	devapt_request_service(svc_promise, "devapt-deployed-tenants-infos", undefined, fn_topology_out('id_out_topology_tenants_infos') )
}

function fn_topology_tenant_infos(arg_tenant_name)
{
	console.log('call:fn_topology_tenant_infos')
	var svc_promise = devapt_get_service('topology', topology_svc_cfg)
	devapt_request_service(svc_promise, "devapt-deployed-tenant-infos", arg_tenant_name, fn_topology_out('id_out_topology_tenantA_infos') )
}


function fn_topology_services_names(arg_tenant_name)
{
	console.log('call:fn_topology_services_names')
	var svc_promise = devapt_get_service('topology', topology_svc_cfg)
	devapt_request_service(svc_promise, "devapt-deployed-services-names", arg_tenant_name, fn_topology_out('id_out_topology_services_names') )
}

function fn_topology_services_infos(arg_tenant_name)
{
	console.log('call:fn_topology_services_infos')
	var svc_promise = devapt_get_service('topology', topology_svc_cfg)
	devapt_request_service(svc_promise, "devapt-deployed-services-infos", arg_tenant_name, fn_topology_out('id_out_topology_services_infos') )
}

function fn_topology_service_infos(arg_tenant_name, arg_svc_name)
{
	console.log('call:fn_topology_service_infos')
	var svc_promise = devapt_get_service('topology', topology_svc_cfg)
	devapt_request_service(svc_promise, "devapt-deployed-service-infos", [arg_tenant_name, arg_svc_name], fn_topology_out('id_out_topology_service1_infos') )
}
