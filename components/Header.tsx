/* eslint-disable @next/next/no-img-element */
import {
  ArrowLeftOnRectangleIcon,
  ArrowSmallLeftIcon,
} from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const Header: React.FC = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const showHeader = router.pathname === "/" ? false : true;

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 flex items-center bg-plant-green p-2">
      {session && (
        <>
          {showHeader && (
            <button
              className="btn btn-ghost text-xl normal-case text-white"
              onClick={() => router.push("/")}
            >
              <ArrowSmallLeftIcon className="mr-1 h-8 w-8 stroke-2" /> Retour
            </button>
          )}

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
            alt="user profile picture"
          />
        </>
      )}
    </nav>
  );
};

export default Header;
