import AuthHeader from "./auth-header";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="w-full bg-muted/30">
      <AuthHeader />

      <main className="flex justify-center px-6 pt-24 pb-12">
        {children}
      </main>
    </div>
  );
}