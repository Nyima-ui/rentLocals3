"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { UserRoundPlus } from "lucide-react";
import CtaButton from "./CtaButton";

const SignupForm = () => {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null,
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setProfileImage(file);
    setProfileImagePreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <div className="flex justify-between pb-[32px]">
      <div className="flex-1 flex flex-col items-center py-[32px] px-5">
        <form className="w-[400px]">
          <Link href="/">
            <Image
              height={32}
              width={137}
              src="/logo.svg"
              loading="eager"
              alt="Rent locals logo"
            />
          </Link>
          <div className="mt-[24px]">
            <button
              type="button"
              className={cn(
                `font-medium cursor-pointer py-2`,
                mode === "signup" ? "" : "opacity-50",
              )}
              onClick={() => setMode("signup")}
            >
              Sign up
            </button>
            <button
              type="button"
              className={cn(
                `font-medium cursor-pointer ml-[24px] py-2`,
                mode === "login" ? "" : "opacity-50",
              )}
              onClick={() => setMode("login")}
            >
              Log in
            </button>
          </div>

          {/* PROFILE PICTURE  */}
          {mode === "signup" && (
            <div className="mt-[24px]">
              <label
                htmlFor="profile-picture"
                style={{
                  backgroundImage: profileImagePreview
                    ? `url("${profileImagePreview}")`
                    : "none",
                }}
                className={cn(
                  `rounded-full size-[50px] flex items-center justify-center bg-primary-100 cursor-pointer bg-center bg-no-repeat bg-cover`,
                )}
              >
                {!profileImage && <UserRoundPlus color="#808080" />}
              </label>
              <input
                type="file"
                id="profile-picture"
                name="profile-picture"
                className="hidden"
                accept="image/png, image/jpg, image/webp"
                onChange={handleImageChange}
              />
            </div>
          )}

          {/* INPUT FIELDS  */}
          <div className="mt-[28px] space-y-[16px]">
            {/* FULLNAME  */}
            {mode === "signup" && (
              <div className="">
                <label htmlFor="fullname" className="font-medium text-sm">
                  Fullname
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary mt-3"
                  placeholder="Jhon Doe"
                />
              </div>
            )}
            {/* EMAIL  */}
            <div className="">
              <label htmlFor="email" className="font-medium text-sm">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary mt-3"
                placeholder="jhoeDoe@example.com"
              />
            </div>
            {/* PASSWORD  */}
            <div className="">
              <label htmlFor="password" className="font-medium text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary mt-3"
                // placeholder="Jhon Doe"
              />
            </div>
            {/* Address  */}
            {mode === "signup" && (
              <div className="">
                <label htmlFor="fullname" className="font-medium text-sm">
                  Address
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary mt-3"
                  placeholder="123 Main St, New York, NY 10001"
                  autoComplete="street-address"
                />
                <CtaButton
                  text="Use my location"
                  className="text-text bg-transparent border border-primary-200 mt-3"
                  type="button"
                />
              </div>
            )}
          </div>

          <CtaButton
            text={mode === "signup" ? "Sign up" : "Log in"}
            className="mt-[32px] w-full text-base"
            type="submit"
          />
        </form>

        <div className="flex items-center gap-4 mt-5 w-full max-w-[400px]">
          <span className="flex-1 h-px block bg-text/30"></span>
          <span className="text-">Or continue with</span>
          <span className="flex-1 h-px block bg-text/30"></span>
        </div>

        <button className="border border-primary-200/50 flex w-full rounded-md gap-3 max-w-[400px] justify-center py-[10px] cursor-pointer mt-[24px] hover:bg-primary-100">
          <Image width={24} height={24} src="/google.svg" alt="Google icon" />
          <span>Google</span>
        </button>
      </div>
      <div className="max-md:hidden h-screen">
        <Image
          height={864}
          width={501}
          src="/authPage.png"
          loading="eager"
          alt="Illustration of people talking from their windows."
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignupForm;
