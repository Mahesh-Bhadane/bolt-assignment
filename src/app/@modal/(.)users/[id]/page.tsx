import UserDetails from "@/components/molecules/UserDetails";
import { getUser } from "@/services";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function UserModalPage({ params }: PageProps) {
  const { id } = params;

  const user = await getUser(id);

  if (user) return <UserDetails user={user} />;
}
