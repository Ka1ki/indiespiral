import { crud, createQueryOptions, createMutationOptions } from "@/api/crud";

const route = "/account";

//get my account
export function getAccountOptions() {
	return createQueryOptions([route, "user"], () => crud.get(`${route}/user`));
}

//update
interface UpdateInput {
	name?: string;
	email?: string;
	phone?: string;
	cart?: any[];
	wishlist?: any[];
}
export function updateAccountOptions() {
	return createMutationOptions([route, "user", "update"], (data: UpdateInput) =>
		crud.put(`${route}/user`, data)
	);
}
