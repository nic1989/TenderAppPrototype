interface HeadProps {
  subHeadShow?: boolean;
}

export default function TenderHeader({subHeadShow = true}: HeadProps) {
    return (
        <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
                Tenders
            </h1>

            {subHeadShow && (
                <p className="text-muted-foreground">
                    Manage your uploaded tenders.
                </p>
            )}
        </div>
    );
}
