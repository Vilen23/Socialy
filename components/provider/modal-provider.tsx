"use client";

import { CreateServerModal } from "@/components/modals/Create-server-modal";
import { useEffect, useState } from "react";
import { InviteModal } from "../modals/Invite-server-modal";

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
    </>
  );
};
