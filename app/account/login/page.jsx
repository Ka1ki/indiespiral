"use client";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import * as authApi from "@/api/auth";
import useAccountStore from "@/stores/useAccountStore";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Phone } from "lucide-react";

function AuthPage() {
  const router = useRouter();
  const token = useAccountStore((state) => state.token);
  const [isExistingUser, setIsExistingUser] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");

  const checkAccount = useMutation(
    authApi.countOptions(setIsExistingUser, setId, () =>
      router.replace("/account/reset?email=" + email)
    )
  );

  const signup = useMutation(authApi.signupOptions());
  const login = useMutation(authApi.loginOptions());

  function handleSignup(e) {
    e.preventDefault();
    signup.mutate({ name, email, phone, pass });
  }

  function handleLogin(e) {
    e.preventDefault();
    login.mutate({ uid: id, pass });
  }

  function handleEmailSubmit(e) {
    e.preventDefault();
    checkAccount.mutate(email);
  }

  useEffect(() => {
    if (token) {
      router.push("/account");
    }
  }, [token, router]);

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://picsum.photos/1000/1600"
          alt="Authentication background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
            <p className="text-xl text-white/90 max-w-md">
              Sign in to your account to continue your journey with us
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-base-100">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">
              {isExistingUser === null && "Get Started"}
              {isExistingUser === true && "Welcome Back"}
              {isExistingUser === false && "Create Account"}
            </h2>
            <p className="text-base-content/60 mt-2">
              {isExistingUser === null && "Enter your email to continue"}
              {isExistingUser === true && "Sign in to your account"}
              {isExistingUser === false &&
                "Fill in your details to get started"}
            </p>
          </div>

          <form className="space-y-6">
            {/* Email Field - Always visible */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 hover:border-primary/50 transition-colors">
                <Mail className="w-4 h-4 text-base-content/50" />
                <input
                  type="email"
                  className="grow"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </label>
            </div>

            {/* Login Fields */}
            {isExistingUser === true && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 hover:border-primary/50 transition-colors">
                    <Lock className="w-4 h-4 text-base-content/50" />
                    <input
                      type="password"
                      className="grow"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </label>
                </div>

                <div className="form-control mt-8">
                  <button
                    className="btn btn-primary hover:brightness-105 transition-all"
                    onClick={handleLogin}
                    disabled={login.isPending}
                  >
                    {login.isPending ? (
                      <span className="loading loading-spinner" />
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </div>

                <div className="text-center mt-4">
                  <a className="link link-primary hover:link-hover text-sm">
                    Forgot your password?
                  </a>
                </div>
              </>
            )}

            {/* Signup Fields */}
            {isExistingUser === false && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 hover:border-primary/50 transition-colors">
                    <User className="w-4 h-4 text-base-content/50" />
                    <input
                      type="text"
                      className="grow"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Phone</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 hover:border-primary/50 transition-colors">
                    <Phone className="w-4 h-4 text-base-content/50" />
                    <input
                      type="text"
                      className="grow"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 hover:border-primary/50 transition-colors">
                    <Lock className="w-4 h-4 text-base-content/50" />
                    <input
                      type="password"
                      className="grow"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      placeholder="Create a password"
                    />
                  </label>
                </div>

                <div className="form-control mt-8">
                  <button
                    className="btn btn-primary hover:brightness-105 transition-all"
                    onClick={handleSignup}
                    disabled={signup.isPending}
                  >
                    {signup.isPending ? (
                      <span className="loading loading-spinner" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Initial Continue Button */}
            {isExistingUser === null && (
              <div className="form-control mt-8">
                <button
                  className="btn btn-primary hover:brightness-105 transition-all"
                  onClick={handleEmailSubmit}
                  disabled={checkAccount.isPending}
                >
                  {checkAccount.isPending ? (
                    <span className="loading loading-spinner" />
                  ) : (
                    "Continue with Email"
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
