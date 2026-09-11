import { Tender } from "../types/tender.types";
import TenderDetailsHeader from "./tender-details/tender-details-header";
import TenderDocuments from "./tender-details/tender-document";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
import AnalysisHeader from "./tender-details/analysis-header";
import RecommendationContent from "./tender-details/recommendation-content";
import ImportantDates from "./tender-details/important-dates";
import AppSummary from "@/components/layout/app-summary";
import AppListContent from "@/components/layout/app-list-content";

interface TenderDetailProps {
    tender: Tender
}

export default function TenderDetails({tender}: TenderDetailProps) {
    const { documents, analyses: [analysis] } = tender;
    return (
        <>
            <TenderDetailsHeader tender={tender} />
            {documents.length > 0 &&  <TenderDocuments documents={documents} /> }
            {analysis && Object.keys(analysis)?.length > 0 && (
                <Card className="mt-6 p-4">
                    <AnalysisHeader />
                    <Separator />
                    <RecommendationContent analysis={analysis} />
                    {analysis?.recommendation?.reasons?.length > 0 && 
                        <AppListContent label="Reason" items={analysis?.recommendation?.reasons} icon={true} />
                    }
                    <AppSummary label="Summary" text={analysis.summary} />
                    <ImportantDates label="Important Dates" dates={analysis.importantDates} />
                    {analysis?.technicalRequirements?.length > 0 && 
                        <AppListContent label="Technical Requirements" items={analysis?.technicalRequirements} />
                    }
                    {analysis?.financialRequirements?.length > 0 && 
                        <AppListContent label="Financial Requirements" items={analysis?.financialRequirements} />
                    }
                    {analysis?.eligibility?.length > 0 && 
                        <AppListContent label="Eligibility" items={analysis?.eligibility} />
                    }
                    {analysis?.risks?.length > 0 && 
                        <AppListContent label="Risk" items={analysis?.risks} />
                    }
                </Card>
            )}
        </>
    )
}