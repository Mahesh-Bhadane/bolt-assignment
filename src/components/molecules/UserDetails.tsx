"use client";

import UserCard from "@/components/molecules/UserCard";
import Modal from "@/components/ui/modal";

interface Props {
  user: User;
}

export default function UserDetails({ user }: Props) {
  return <Modal>{user && <UserCard user={user} />}</Modal>;
}
