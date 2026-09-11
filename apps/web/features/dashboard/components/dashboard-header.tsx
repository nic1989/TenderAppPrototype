interface DashboardHeaderProps {
    name: string;
}

export default function DashboardHeader({name}: DashboardHeaderProps) {

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 17
            ? "Good Afternoon"
            : "Good Evening";

    return (
        <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
                {greeting}, {name} {'\u{1F44B}'}
            </h1>

            <p className="text-muted-foreground">
                Welcome to AI Bid Assistant.
            </p>
        </div>
    );
}