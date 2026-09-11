import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardRecentTender } from "../types/dashboard.types";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { useCallback } from "react";
import { formatDate } from '@/utils/utilities'

interface RecentTendersProps {
    tenders: DashboardRecentTender[];
}

export default function RecentTenders({tenders}: RecentTendersProps) {
    const getStatusDiv = useCallback((status: string) => {
        let classes = 'bg-green-50 text-green-700';
        if (status === 'Inactive') {
            classes = 'bg-red-50 text-red-700'
        }
        return <div className={`${classes} rounded-2xl p-2 px-4`}>
                {status}
            </div>
    }, []);
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Recent Tenders
                </CardTitle>
                <Button className="cursor-pointer" variant="link">
                    <Link href={'/tenders'}>View All</Link>
                </Button>
            </CardHeader>

            <CardContent>
                {tenders?.length > 0 ? (
                    tenders?.map((item) => (
                        <CardDescription key={item.id} className="my-2">
                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                    <Link className="text-[#6366f1]" href={`/tenders/${item.id}`}>{item.title}</Link>
                                    <span className="text-[12px]">{formatDate(item.createdAt)}</span>
                                </div>
                                {getStatusDiv(item.status)}
                            </div>
                        </CardDescription>
                        
                    ))
                ) : (
                    <p className="text-center text-muted-foreground">
                        No tenders found.
                    </p>
                )}
            </CardContent>
        </Card>
    )
}