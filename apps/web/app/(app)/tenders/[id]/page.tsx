'use client'

import { useTenderById } from "@/features/tenders/hooks/useTenderById";
import { LoadingScreen } from "@/features/auth/components/loading-screen";
import AppBreadcrumbs from "@/components/layout/app-breadcrumbs";
import { useParams } from "next/navigation";
import { Tender } from "@/features/tenders/types/tender.types";
import TenderDetails from "@/features/tenders/components/tender-details";

export default function TenderViewPage() {
    const {id} = useParams<{id: string}>();
    const { data, isLoading } = useTenderById(id);

    const tenderData = data as unknown as Tender;

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <>
            <AppBreadcrumbs head="Dashboard" controller="Tenders" view={tenderData.title} />
            <TenderDetails tender={tenderData} />
        </>
    )
}