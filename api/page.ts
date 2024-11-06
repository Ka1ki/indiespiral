import { crud, createQueryOptions, createMutationOptions } from "@/api/crud";

const route = "/website/page";

//count
export function countOptions(
	query?: any,
	queryIsKey = true,
	keys: Array<any> = []
) {
	if (queryIsKey) keys.push(query);
	return createQueryOptions([route, "count", ...keys], () =>
		crud.get(`${route}/count`, query)
	);
}

//list
export function listOptions(
	query?: any,
	queryIsKey = true,
	keys: Array<any> = []
) {
	if (queryIsKey) keys.push(query);
	return createQueryOptions([route, "list", ...keys], () =>
		crud.get(`${route}/list`, query)
	);
}

//one
export function getOneOptions(uid: string, query: any, keys: Array<any> = []) {
	return createQueryOptions([route, "one", query, uid, ...keys], () =>
		crud.get(`${route}/one/${uid}`, query)
	);
}

//query
export function getQueryOptions(
	query?: any,
	queryIsKey = true,
	keys: Array<any> = []
) {
	if (queryIsKey) keys.push(query);
	return createQueryOptions([route, "query", ...keys], () =>
		crud.get(`${route}/`, query)
	);
}

//create
export function createOptions(body: any, query?: any) {
	return createMutationOptions([route, "create"], () =>
		crud.post(`${route}/`, body, query)
	);
}

//update
export function updateOptions(uid: string, body: any, query?: any) {
	return createMutationOptions([route, "update", uid], () =>
		crud.put(`${route}/${uid}`, body, query)
	);
}

//archive
export function archiveOptions(uid: string, keys: Array<any> = []) {
	return createQueryOptions([route, "archive", uid, ...keys], () =>
		crud.delete(`${route}/${uid}`)
	);
}

//delete
export function deleteOptions(uid: string, keys: Array<any> = []) {
	return createQueryOptions([route, "delete", uid, ...keys], () =>
		crud.delete(`${route}/permanent/${uid}`)
	);
}
