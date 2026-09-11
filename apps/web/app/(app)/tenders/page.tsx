'use client'

import { useTenders } from "@/features/tenders/hooks/useTenders"
import TenderHeader from "@/features/tenders/components/tender-header";
import TenderTable from "@/features/tenders/components/tender-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import AppBreadcrumbs from "@/components/layout/app-breadcrumbs";


export default function TenderPage() {
    const { data, isLoading } = useTenders();
    return (
        <>
            <AppBreadcrumbs head="Dashboard" controller="Tenders" />
            <TenderHeader />
            {isLoading ? (
                <DataTableSkeleton />
            ) : (
                <TenderTable tenders={data || []} />
            )}
        </>
    )
}