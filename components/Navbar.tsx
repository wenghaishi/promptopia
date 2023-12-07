"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import "@styles/global.css";
import { BuiltInProviderType } from "next-auth/providers/index";

export default function Navbar() {
  const isUserLoggedin = true;
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  const { data: session } = useSession();

  useEffect(() => {
    const setupProviders = async () => {
      try {
        const response = await getProviders();
        console.log(response);
        setProviders(response);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    setupProviders();
  }, []);

  console.log(session);
  console.log(providers);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      <div className="sm:flex ">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create post
            </Link>
            <button onClick={() => signOut()} className="outline_btn">
              Sign Out
            </button>
            <Image
              src={session?.user?.image || '/assets/images/logo.svg'}
              alt="user profile image"
              className="rounded-full"
              width={37}
              height={37}
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="absolute top-0 bg-white text-center right-0 mt-16 gap-4 mr-12 p-10 flex flex-col">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown((prev) => !prev)}
                >
                  My profile
                </Link>

                <button
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="bg-black text-white px-4 py-2 rounded-full"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}
