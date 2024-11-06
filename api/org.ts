import { crud, createQueryOptions } from "@/api/crud";
const route = "/org";

//one
export function getOneOptions() {
  const uid = process.env.ORG_ID;
  return createQueryOptions([route, "one", uid], () =>
    crud.get(`${route}/one/${uid}`)
  );
}
