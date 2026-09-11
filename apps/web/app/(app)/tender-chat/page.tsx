'use client'

import AppBreadcrumbs from "@/components/layout/app-breadcrumbs";
import { LoadingScreen } from "@/features/auth/components/loading-screen";
import TenderHeader from "@/features/tenders/components/tender-header";
import { useTenders } from "@/features/tenders/hooks/useTenders"

import { useEffect, useState } from "react";
import ChatHeader from "@/features/tender-chat/components/chat-header";
import ChatWindow from "@/features/tender-chat/components/chat-window";
import { useTenderAnalysis } from "@/features/tender-chat/hooks/useTenderAnalysis";

interface TenderItemsProps {
    label: string
    value: string
}

export default function TenderChatPage() {
    const {data, isLoading} = useTenders();
    const [tenders, setTenders] = useState<TenderItemsProps[]>([]);
    const [selectedId, setSelectedId] = useState('');
    const analysisDetail = useTenderAnalysis(selectedId);

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
        <>
            <AppBreadcrumbs head="Dashboard" controller="Tenders" view="Chat" />
            <TenderHeader subHeadShow={false} />
            <ChatHeader tenders={tenders} heading={'Select a Tender below to start a chat'} setSelectedId={setSelectedId} />
            {analysisDetail?.isLoading && (
                <LoadingScreen />
            )}
            {analysisDetail?.status === 'success' && (
                <ChatWindow summary={analysisDetail?.data?.summary} selectedId={selectedId} />
            )}
        </>
    )
}