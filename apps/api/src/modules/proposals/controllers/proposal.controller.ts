import { Controller, Post, Param, UseGuards, Res } from "@nestjs/common";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { ProposalService } from "../services/proposal.service";
import { CurrentUser } from '@common/decorators/current-user.decorator';
import type { JwtUser } from "@modules/auth/interfaces/jwt-user.interface";
import { ProposalPdfService } from "../services/proposal-pdf.service";

@Controller('/tenders/:id/proposal')
@UseGuards(JwtAuthGuard)
export class PropsalController {
    constructor(
        private readonly proposalService: ProposalService,
        private readonly proposalPdfService: ProposalPdfService
    ) { }

    @Post()
    generate(@Param('id') tenderId: string, @CurrentUser() user: JwtUser) {
        return this.proposalService.generate(tenderId, user.id);
    }

    @Post('pdf')
    async generatePdf(@Param('id') tenderId: string, @CurrentUser() user: JwtUser, @Res() res: any) {
        // const result = await this.proposalService.generate(tenderId, user.id);

        const result = {
            "proposal": {
                "executiveSummary": "ABC Infra is pleased to submit this proposal for the construction of the Block Primary Health Unit (BPHU) building at Lahunipada, Sundergarh, as invited by Engineering Projects (India) Limited on behalf of the National Health Mission, Govt. of Odisha. With seven years of specialized experience in the civil infrastructure sector and a proven track record of maintaining high-quality standards, ABC Infra is exceptionally well-positioned to deliver this project. Our organization maintains robust ISO 9001 and ISO 14001 certifications, ensuring that all building, mechanical, and electrical works meet the rigorous requirements stipulated in the tender. We acknowledge the stringent three-month project completion timeline and are prepared to mobilize the necessary resources, technical expertise, and management oversight to ensure timely delivery. By leveraging our financial stability, with an annual turnover of 65 Crores, and our extensive experience in non-residential construction, we provide the technical and operational capacity required to successfully execute this vital healthcare infrastructure project. We look forward to the opportunity to contribute to the healthcare development of Odisha through the delivery of a high-quality, compliant facility.",
                "companyIntroduction": "ABC Infra is a dedicated civil infrastructure firm with seven years of industry experience. Headquartered with a professional workforce of 51 employees, the company has established a reputation for excellence in the construction sector. Our operational foundation is built upon strict adherence to quality and environmental management systems, evidenced by our ISO 9001 and ISO 14001 certifications. We maintain full regulatory compliance with essential documentation including GST and PAN registration. Over the past seven years, ABC Infra has successfully navigated the complexities of civil infrastructure projects, consistently meeting technical requirements and client expectations. Our financial standing, characterized by an annual turnover of 65 Crores, provides the necessary backing to manage projects of varying scale and complexity. We are committed to transparency, technical integrity, and professional project management in all our engagements. By integrating skilled human resources with systematic construction methodologies, ABC Infra ensures that every project is completed in alignment with specified standards and project deadlines.",
                "projectUnderstanding": "The objective of this project is the construction of a Block Primary Health Unit (BPHU) at Lahunipada, Sundergarh District, Odisha. The scope of work is comprehensive, covering building works, internal and external public health systems, sanitary works, electrical installations, fire fighting systems, and the provision of furniture. The project must be completed within a strict 3-month timeframe from the 10th day of the Letter of Intent issuance. Technical expectations include high-quality workmanship, strict adherence to site safety and environmental standards, and the deployment of qualified technical personnel, including civil and electrical engineers. As a percentage rate basis tender, the project requires precise cost estimation and efficient resource allocation to maintain firm rates for the duration of the contract.",
                "technicalApproach": [
                    {
                        "title": "Site Mobilization",
                        "description": "Immediate deployment of project management teams and necessary plant and equipment to the Lahunipada site upon issuance of the Letter of Intent."
                    },
                    {
                        "title": "Quality and Safety Compliance",
                        "description": "Implementation of ISO 9001 and 14001 standards to ensure all building and infrastructure components meet the specified quality benchmarks."
                    },
                    {
                        "title": "Skilled Workforce Management",
                        "description": "Utilization of certified staff, including Recognition of Prior Learning (RPL) certified workers and engineers with over 5 years of experience in civil and electrical domains."
                    },
                    {
                        "title": "Integrated MEP Systems",
                        "description": "Synchronized installation of plumbing, sanitary fixtures, fire fighting systems, and electrical networks to ensure seamless functionality within the building structure."
                    },
                    {
                        "title": "Quality Control and Billing",
                        "description": "Dedicated oversight by a Billing and Quality Control Engineer to manage documentation, track progress against the timeline, and ensure material compliance."
                    }
                ],
                "implementationMethodology": [
                    {
                        "title": "Phase 1: Pre-Construction Planning",
                        "description": "Site verification, finalization of the construction schedule, and mobilization of equipment and technical personnel."
                    },
                    {
                        "title": "Phase 2: Civil and Structural Works",
                        "description": "Execution of the main building structure in accordance with approved architectural and structural drawings."
                    },
                    {
                        "title": "Phase 3: MEP and Internal Systems",
                        "description": "Concurrent installation of public health, electrical, and fire fighting systems as the primary structure progresses."
                    },
                    {
                        "title": "Phase 4: Finishing and Furnishing",
                        "description": "Application of interior/exterior finishes and installation of designated furniture to meet functional requirements."
                    },
                    {
                        "title": "Phase 5: Project Closeout",
                        "description": "Final inspections, site clearance, commissioning of systems, and submission of mandatory project documentation."
                    }
                ],
                "keyDeliverables": [
                    "Completed Block Primary Health Unit building structure",
                    "Fully operational internal and external public health systems",
                    "Certified electrical and fire fighting installations",
                    "Installed furniture as per the bill of quantities",
                    "Site visit declaration report",
                    "Project completion and quality compliance reports",
                    "Documentation confirming adherence to ISO 9001 & 14001"
                ],
                "projectTimeline": [
                    {
                        "phase": "Mobilization and Foundation",
                        "duration": "1 Month"
                    },
                    {
                        "phase": "Structural and MEP Infrastructure",
                        "duration": "1 Month"
                    },
                    {
                        "phase": "Finishing, Furnishing, and Handover",
                        "duration": "1 Month"
                    }
                ],
                "riskMitigation": [
                    {
                        "title": "Timeline Adherence",
                        "mitigation": "Utilization of an accelerated work schedule with multi-shift deployment to ensure the 3-month completion requirement is met."
                    },
                    {
                        "title": "Inflation and Cost Risk",
                        "mitigation": "Strict internal procurement monitoring and advanced supply chain management to maintain project costs within the firm-rate structure."
                    },
                    {
                        "title": "Regulatory Compliance",
                        "mitigation": "Rigorous oversight of Odisha-specific GST registration and documentation to prevent any risk of summary tender rejection."
                    }
                ],
                "complianceStatement": "Based on the provided company profile, ABC Infra meets the fundamental criteria for this tender, including the required turnover (65 Crores vs the 50% estimated cost threshold) and relevant ISO certifications. We possess the necessary GST registration and seven years of experience in the sector. However, as the tender requires specific non-residential building project history (3 works of 40%, 2 of 60%, or 1 of 80%), additional verification of our past project references against these specific percentages is recommended before final submission to ensure full compliance.",
                "commercial": {
                    "pricingStrategy": "Percentage Rate Basis as per the provided Bill of Quantities, ensuring all rates remain firm for the project duration as per contract terms.",
                    "paymentTerms": "To be processed by Engineering Projects (India) Limited in accordance with the project milestone completion and verification of deliverables.",
                    "commercialConsiderations": [
                        "Tender fee of Rs. 11,800 to be paid via prescribed channels.",
                        "EMD of Rs. 1,09,076 via Bank Guarantee.",
                        "Security Deposit cum Performance Guarantee of 5% of contract value to be provided as per guidelines."
                    ]
                },
                "assumptions": [
                    "It is assumed that the site handover will occur immediately upon the issuance of the Letter of Intent to facilitate the 3-month completion schedule.",
                    "It is assumed that all necessary local permits and site access will be provided by the client as per standard government project practices.",
                    "The availability of qualified technical staff meeting the 5-year experience requirement is assumed to be within our current recruitment capabilities."
                ],
                "conclusion": "ABC Infra is confident in our capacity to deliver the BPHU building project in Lahunipada with the highest standards of professional excellence. Our commitment to quality, financial stability, and disciplined project management aligns perfectly with the requirements set forth by Engineering Projects (India) Limited. We are prepared to mobilize immediately to ensure all milestones are achieved within the aggressive 3-month delivery window.",
                "declaration": "I/We hereby declare that all information provided in this proposal is accurate and true to the best of our knowledge. ABC Infra acknowledges the terms and conditions stipulated in the tender document and confirms that we are not currently blacklisted or debarred by any State or Central Government organization. We are prepared to fulfill all requirements regarding the Earnest Money Deposit and Performance Guarantee as requested."
            },
            "tender": {
                "id": "1c8ca267-ede5-4ecb-b486-1c38c0d44c2b",
                "title": "Airport Expansion Project",
                "description": "Airport civil works",
                "status": "Active",
                "createdAt": new Date("2026-07-11T06:56:44.342Z"),
                "updatedAt": new Date("2026-07-20T08:44:35.395Z"),
                "organizationId": "3c512bdb-be21-4973-89fa-c0ad6bda151a",
                "createdById": "40ed7f9b-d30e-49df-ae3d-c5ec89ab7b44",
                "documents": [
                    {
                        "id": "c6e936a2-bb92-4800-993a-6bcc0286bf15",
                        "tenderId": "1c8ca267-ede5-4ecb-b486-1c38c0d44c2b",
                        "orgFileName": "6565dbb36c16dTenderdoc144.pdf",
                        "fileName": "1783753019222_42487682.pdf",
                        "filePath": "C:/projects/ai-bid-assistant/apps/api/uploads/tenders/1c8ca267-ede5-4ecb-b486-1c38c0d44c2b/1783753019222_42487682.pdf",
                        "mimeType": "application/pdf",
                        "fileSize": 6774486,
                        "uploadedById": "40ed7f9b-d30e-49df-ae3d-c5ec89ab7b44",
                        "documentType": "Tender",
                        "createdAt": new Date("2026-07-11T06:56:59.312Z")
                    }
                ]
            },
            "companyProfile": {
                "id": "1059685d-0672-4d15-aeb8-e377a0f622b9",
                "organizationId": "3c512bdb-be21-4973-89fa-c0ad6bda151a",
                "companyName": "ABC Infra",
                "turnover": "65 Crores",
                "experience": "7 Years",
                "certifications": [
                    "ISO 9001",
                    "ISO 14001"
                ],
                "documents": [
                    "GST",
                    "PAN",
                    "MSME"
                ],
                "website": "http://www.testinfra.com",
                "employeeCount": 51,
                "industry": "Civil Infra",
                "gstNumber": "SJD83r83msKSD",
                "panNumber": "BMAKDJ039SKJ",
                "createdAt": new Date("2026-07-21T10:55:36.169Z"),
                "updatedAt": new Date("2026-07-21T11:10:29.339Z")
            }
        }

        return await this.proposalPdfService.generateProposal(result.proposal, result.companyProfile, result.tender, res);
    }
}