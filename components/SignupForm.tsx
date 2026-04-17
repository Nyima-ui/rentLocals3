"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { UserRoundPlus } from "lucide-react";
import CtaButton from "./CtaButton";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null,
  );
  const [authError, setAuthError] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setProfileImage(file);
    setProfileImagePreview(file ? URL.createObjectURL(file) : null);
    if (file) setAvatarError(false);
  };

  const uploadAvatar = async (userId: string, file: File) => {
    const fileExt = file.name.split(".").pop();
    const filePath = `avatars/${userId}.${fileExt}`;

    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (storageError) throw storageError;

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullname = formData.get("fullname") as string;
    const address = formData.get("address") as string;
    const avatarFile = formData.get("profile-picture") as File;

    if (mode === "signup") {
      if (!avatarFile || avatarFile.size === 0) {
        setAvatarError(true);
        return;
      }
      if (!email || !password || !fullname || !address) {
        alert("Please fill in all credentials");
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        const userId = data.user?.id;
        if (!userId) throw new Error("Sign up failed, no user returned.");

        const avatarUrl = await uploadAvatar(userId, avatarFile);

        const { error: profileError } = await supabase
          .from("profiles")
          .update({ fullname, location: address, avatar: avatarUrl })
          .eq("id", userId);

        if (profileError) throw profileError;

        router.push("/");
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("User already registered")
        ) {
          setAuthError(
            "An account with this email already exists. Please login instead.",
          );
          return;
        }
        console.error(`Error signing up ${error}`);
      } finally {
        setLoading(false);
      }
    } else {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      try {
        setLoading(true);
        if (!email || !password) {
          alert("Please fill in all credentials");
          return;
        }
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/");
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("Invalid login credentials")
        ) {
          setAuthError("Incorrect email or password.");
          return;
        }
        console.error(`Error signing in ${error}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      setGoogleLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error(`Error signing up with Google, ${error}`);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex justify-between pb-[32px]">
      <div className="flex-1 flex flex-col items-center py-[32px] px-5">
        <form className="w-[400px]" onSubmit={handleSubmit}>
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
              onClick={() => {
                setMode("signup");
                setAuthError("");
              }}
            >
              Sign up
            </button>
            <button
              type="button"
              className={cn(
                `font-medium cursor-pointer ml-[24px] py-2`,
                mode === "login" ? "" : "opacity-50",
              )}
              onClick={() => {
                setMode("login");
                setAuthError("");
              }}
            >
              Log in
            </button>
          </div>

          {/* PROFILE PICTURE  */}
          {mode === "signup" && (
            <div className="mt-[24px]">
              <label
                htmlFor="profile-picture"
                aria-label="Upload profile picture"
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
              {avatarError && (
                <p className="text-sm text-primary mt-1">
                  Please upload a profile picture
                </p>
              )}
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
                  required
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
                placeholder="johnDoe@example.com"
                required
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
                required
              />
              {authError && mode === "login" && (
                <p className="mt-3 text-sm text-red-400 font-semibold">
                  {authError}
                </p>
              )}
            </div>
            {/* Address  */}
            {mode === "signup" && (
              <div className="">
                <label htmlFor="address" className="font-medium text-sm">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="block p-[8px] border border-primary-200 rounded-md w-full focus:outline-1.5 focus:outline-primary mt-3"
                  placeholder="123 Main St, New York, NY 10001"
                  autoComplete="street-address"
                  required
                />
                <p className="text-sm mt-1 text-text/80">
                  Pickup & drop-off location
                </p>
                <CtaButton
                  text="Use my location"
                  className="text-text bg-transparent border border-primary-200 mt-3"
                  type="button"
                />
              </div>
            )}
            {authError && mode === "signup" && (
              <p className="mt-3 text-sm text-red-400 font-semibold">
                {authError}
              </p>
            )}
          </div>

          <CtaButton
            text={mode === "signup" ? "Sign up" : "Log in"}
            className="mt-[32px] w-full text-base"
            type="submit"
            loading={loading}
          />
        </form>

        <div className="flex items-center gap-4 mt-5 w-full max-w-[400px]">
          <span className="flex-1 h-px block bg-text/30"></span>
          <span className="text-">Or continue with</span>
          <span className="flex-1 h-px block bg-text/30"></span>
        </div>

        <button
          className={cn(
            `border border-primary-200/50 flex w-full rounded-md gap-3 max-w-[400px] justify-center py-[10px] cursor-pointer mt-[24px] hover:bg-primary-100`,
            googleLoading && "cursor-not-allowed opacity-70",
          )}
          onClick={signInWithGoogle}
          disabled={googleLoading}
        >
          {googleLoading && (
            <span className="size-6 border-3 border-primary-200 border-b-transparent rounded-full inline-block animate-spin"></span>
          )}
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
