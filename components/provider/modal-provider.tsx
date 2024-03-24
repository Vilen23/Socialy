"use client";

import { CreateServerModal } from "@/components/modals/Create-server-modal";
import { useEffect, useState } from "react";
import { InviteModal } from "../modals/Invite-server-modal";
import { EditServerModal } from "../modals/Edit-server-modal";
import { MembersModal } from "../modals/members-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal/>
      <EditServerModal/>
      <MembersModal/>
    </>
  );
};
