import Link from "next/link";
import AuthLogo from "./auth-logo";

export default function AuthHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
        <Link href="/">
          <AuthLogo />
        </Link>
      </div>
    </header>
  );
}