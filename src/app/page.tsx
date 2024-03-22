import UserList from "@/components/users/UserList";
import { fetchUsers } from "@/components/users/actions";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const users = await fetchUsers(page);

  return <UserList initialUsers={users} />;
};

export default Page;
