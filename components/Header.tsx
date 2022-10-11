import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 flex items-center bg-plant-green p-2">
      {session && (
        <>
          <div className="flex-1" />
          <button
            className="mr-2 rounded-sm text-white"
            onClick={() => signOut()}
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
          </button>

          <img
            width={45}
            src={session.user.image}
            className="rounded-full bg-white"
          />
        </>
      )}
    </nav>
  );
};

export default Header;
