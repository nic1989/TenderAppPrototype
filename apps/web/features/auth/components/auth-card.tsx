import AuthLayout from "@/components/auth/auth-layout";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function AuthCard({
  title,
  description,
  children,
}: Props) {
  return (
    <AuthLayout>
        <Card className="w-full max-w-md shadow-lg">
        <CardContent className="space-y-4 p-8">
            <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
                {title}
            </h1>

            <p className="text-sm text-muted-foreground">
                {description}
            </p>
            </div>

            {children}
        </CardContent>
        </Card>
    </AuthLayout>
  );
}