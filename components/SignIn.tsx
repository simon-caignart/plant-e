import { signIn } from "next-auth/react";

export function SignIn() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-5 rounded-xl bg-gray-100 px-6 py-10">
        <h1 className="text-2xl font-bold">Arroseur 2000 🚿</h1>
        <button
          className="rounded bg-green-600 px-3 py-2 text-white"
          onClick={() => signIn()}
        >
          Se connecter
        </button>
      </div>
    </div>
  );
}
