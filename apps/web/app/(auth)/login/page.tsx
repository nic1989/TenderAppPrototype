import AuthCard from "@/features/auth/components/auth-card";
import LoginForm from "@/features/auth/components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30">
      <AuthCard
        title="Login"
        description="Sign in to your AI Bid Assistant account."
      >
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
                href="/register"
                className="font-medium text-primary hover:underline"
            >
                Register
            </Link>
        </p>
      </AuthCard>
    </main>
  );
}