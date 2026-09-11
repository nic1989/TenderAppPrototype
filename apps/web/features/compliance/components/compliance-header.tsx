import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileBadge2, MessageCircle, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ComplianceHeader() {
    const router = useRouter();
    return (
        <CardTitle className="flex justify-between">
            <span className="mt-2 flex">
                <ShieldCheck /> <span className="ml-2">Compliance Report</span>
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
                    onClick={() => router.push('/proposal')}>
                        <FileBadge2 /> Generate Proposal
                </Button>
            </div>
        </CardTitle>
    )
}