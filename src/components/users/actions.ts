"use server";

import { getUsers } from "@/services";

export async function fetchUsers(page = 1, perPage = 8) {
  const users = await getUsers(page, perPage);

  return users;
}
