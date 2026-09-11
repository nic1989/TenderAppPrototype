import AuthCard from "@/features/auth/components/auth-card";
import RegisterForm from "@/features/auth/components/register-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30">
      <AuthCard
        title="Register"
        description="Sign up to your AI Bid Assistant account."
      >
        <RegisterForm />
        <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
                href="/login"
                className="font-medium text-primary hover:underline"
            >
                Login
            </Link>
        </p>
      </AuthCard>
    </main>
  );
}