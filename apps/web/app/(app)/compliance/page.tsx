'use client'

import AppBreadcrumbs from "@/components/layout/app-breadcrumbs"
import { AppSkeleton } from "@/components/layout/app-skeleton"
import { LoadingScreen } from "@/features/auth/components/loading-screen"
import ComplianceOverview from "@/features/compliance/components/compliance-overview"
import { useCompliance } from "@/features/compliance/hooks/useCompliance"
import ChatHeader from "@/features/tender-chat/components/chat-header"
import TenderHeader from "@/features/tenders/components/tender-header"
import { useTenders } from "@/features/tenders/hooks/useTenders"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface TenderItemsProps {
    label: string
    value: string
}

export default function CompliancePage() {
    const router = useRouter();
    const {data, isLoading} = useTenders();
    const [tenders, setTenders] = useState<TenderItemsProps[]>([]);
    const [selectedId, setSelectedId] = useState('');
    const {data: complianceData, status: complianceStatus, isLoading: complianceLoading, error} = useCompliance(selectedId);

    useEffect(() => {
        if (!data) return;
        const tenderItems = data.map((item) => {
            return {
                label: item.title,
                value: item.id
            }
        });
        setTenders(tenderItems);
    }, [data]);

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <div className="container w-full">
            <AppBreadcrumbs head="Dashboard" controller="Tenders" view="Compliance" />
            <TenderHeader subHeadShow={false} />
            <ChatHeader tenders={tenders} heading={'Select a Tender below to check compliance'} setSelectedId={setSelectedId} />
            {complianceLoading && (
                <AppSkeleton />
            )}
            {complianceStatus === 'success' && (
                <ComplianceOverview complianceData={complianceData} />
            )}
            {complianceStatus === 'error' && (
                <div className="p-4 flex justify-center font-medium"><button className="text-[#6366f1] cursor-pointer" onClick={() => router.push('/analysis')}>Analyzed&nbsp;</button> the Tender and add <button className="text-[#6366f1] cursor-pointer" onClick={() => router.push('/company-profile')}>&nbsp;company profile&nbsp;</button> to check the compliance.</div>
            )}
            
        </div>
    )
}