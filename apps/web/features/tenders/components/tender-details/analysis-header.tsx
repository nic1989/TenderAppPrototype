import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, FileBadge2, MessageCircle, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AnalysisHeader() {
    const router = useRouter();
    return (
        <CardTitle className="flex justify-between">
            <span className="mt-2 flex">
                <Brain /> <span className="ml-2">AI Tender Analysis</span>
            </span>
            <div className="flex">
                <Button
                    variant={'outline'}
                    className="cursor-pointer bg-indigo-500 text-white"
                    onClick={() => router.push('/tender-chat')}>
                        <MessageCircle /> Ask Questions
                </Button>
                <Button
                    variant={'outline'}
                    className="cursor-pointer bg-indigo-500 text-white ml-2"
                    onClick={() => router.push('/compliance')}>
                        <ShieldCheck />Tender Compliance
                </Button>
                <Button
                    variant={'outline'}
                    className="cursor-pointer bg-indigo-500 text-white ml-2"
                    onClick={() => router.push('/proposal')}>
                        <FileBadge2 /> Generate Proposal
                </Button>
            </div>
        </CardTitle>
    )
}