import UserCard from "@/components/molecules/UserCard";

import { getUser } from "@/services";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function UserPage({ params }: PageProps) {
  const { id } = params;

  const user = await getUser(id);

  if (user)
    return (
      <section className="flex items-center justify-center h-screen container">
        <div className="w-full max-w-sm">
          <UserCard user={user} />
        </div>
      </section>
    );
}
