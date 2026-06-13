"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2, UserPlus, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters")
      .max(80, "Name is too long"),
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const PASSWORD_REQUIREMENTS = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One number", test: (v: string) => /[0-9]/.test(v) },
];

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const passwordValue = watch("password") || "";

  const onSubmit = async (values: RegisterFormValues) => {
    setServerError(null);

    try {
      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            fullName: values.name,
            email: values.email,
            password: values.password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setServerError(
          data.message ||
          "Registration failed"
        );
        return;
      }

      router.push("/login");
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Unable to create account"
      );
    }
  };

  return (
    <div className="w-full max-w-sm">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Create your account
        </h1>
        <p className="text-sm text-slate-500">
          Get started with AI-powered medical report analysis.
        </p>
      </div>

      {/* Server error */}
      {serverError && (
        <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Full Name */}
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            error={!!errors.name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={!!errors.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              autoComplete="new-password"
              error={!!errors.password}
              aria-invalid={!!errors.password}
              aria-describedby="password-requirements"
              className="pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-600">{errors.password.message}</p>
          )}

          {/* Password requirements checklist */}
          <div id="password-requirements" className="mt-2.5 space-y-1">
            {PASSWORD_REQUIREMENTS.map(({ label, test }) => {
              const met = test(passwordValue);
              return (
                <div
                  key={label}
                  className={cn(
                    "flex items-center gap-1.5 text-xs transition-colors",
                    met ? "text-green-600" : "text-slate-400"
                  )}
                >
                  <div
                    className={cn(
                      "w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0",
                      met ? "bg-green-100" : "bg-slate-100"
                    )}
                  >
                    {met && <Check className="w-2.5 h-2.5" />}
                  </div>
                  {label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              error={!!errors.confirmPassword}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
              className="pr-10"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              tabIndex={-1}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p id="confirm-password-error" className="mt-1.5 text-xs text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              Create account
            </>
          )}
        </Button>

        <p className="text-xs text-slate-400 text-center leading-relaxed">
          By creating an account, you agree to our{" "}
          <Link href="#" className="text-slate-600 hover:text-slate-800 font-medium">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-slate-600 hover:text-slate-800 font-medium">
            Privacy Policy
          </Link>
          .
        </p>
      </form>

      {/* Footer link */}
      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href={ROUTES.LOGIN} className="font-semibold text-blue-600 hover:text-blue-700">
          Sign in
        </Link>
      </p>
    </div>
  );
}