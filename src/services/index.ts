"use server";

const API_BASE_URL = "https://reqres.in/api";

export const getUsers = async (
  page: number,
  perPage: number
): Promise<User[]> => {
  const response = await fetch(
    `${API_BASE_URL}/users?page=${page}&per_page=${perPage}`
  );
  const data = await response.json();
  return data.data;
};

export const createUser = async (name: string, job: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, job }),
  });
  const data = await response.json();
  return data;
};

export const updateUser = async (
  userId: number,
  name: string,
  job: string
): Promise<Pick<User, "name" | "job">> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, job }),
  });
  const data = await response.json();
  return data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "DELETE",
  });
};
