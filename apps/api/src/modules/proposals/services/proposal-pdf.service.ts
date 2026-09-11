import { Injectable } from '@nestjs/common';
import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont, degrees } from 'pdf-lib';
import type { Response } from 'express';
import { ProposalResponse, ProposalSection, RiskMitigation } from '../interfaces/proposal-response.interface';
import { CompanyProfile, Tender } from '@prisma/client';

interface PdfCursor {
    page: PDFPage;
    y: number;
}

@Injectable()
export class ProposalPdfService {
    private readonly left = 50;
    private readonly right = 545;
    private readonly bottomMargin = 80;
    private font!: PDFFont;
    private bold!: PDFFont;
    private pdf!: PDFDocument

    async generateProposal(proposal: ProposalResponse, companyProfile: CompanyProfile, tender: Tender, res: Response) {
        this.pdf = await PDFDocument.create();

        const cover = this.pdf.addPage([595, 842]);
        this.drawCoverPage(cover, companyProfile, tender);

        const page = this.pdf.addPage([595, 842]); // A4

        this.font = await this.pdf.embedFont(StandardFonts.Helvetica);
        this.bold = await this.pdf.embedFont(StandardFonts.HelveticaBold);

        let cursor = { page, y: 800 };

        this.drawWatermark(cursor);
        cursor = this.drawHeader(cursor);

        const summaryHeight = this.calculateTextHeight(proposal.executiveSummary, 460, this.font, 11)
        if (!this.willFit(cursor, summaryHeight + 30)) {
            this.newPage(cursor);
        }
        cursor.y -= 25;
        cursor = this.drawSectionTitle('Executive Summary', cursor);
        cursor = this.drawWrappedText(proposal.executiveSummary, 65, cursor, 460)

        const companyHeight = this.calculateTextHeight(proposal.companyIntroduction, 460, this.font, 11)
        if (!this.willFit(cursor, companyHeight + 30)) {
            this.newPage(cursor);
        }
        cursor.y -= 25;
        cursor = this.drawSectionTitle('Company Introduction', cursor);
        cursor = this.drawWrappedText(proposal.companyIntroduction, 65, cursor, 460)

        const projectHeight = this.calculateTextHeight(proposal.projectUnderstanding, 460, this.font, 11)
        if (!this.willFit(cursor, projectHeight + 30)) {
            this.newPage(cursor);
        }
        cursor.y -= 25;
        cursor = this.drawSectionTitle('Project Understanding', cursor);
        cursor = this.drawWrappedText(proposal.projectUnderstanding, 65, cursor, 460)

        const technicalHeight = this.calculateSectionHeight(proposal.technicalApproach, item => item.description);
        if (!this.willFit(cursor, technicalHeight)) {
            this.newPage(cursor);
        }
        cursor.y -= 15;
        cursor = this.drawProposalSections('Technical Approach', proposal.technicalApproach, cursor);

        const methodologyHeight = this.calculateSectionHeight(proposal.implementationMethodology, item => item.description);
        if (!this.willFit(cursor, methodologyHeight)) {
            this.newPage(cursor);
        }
        cursor.y -= 15;
        cursor = this.drawProposalSections('Implementation Methodology', proposal.implementationMethodology, cursor);

        cursor.y -= 15;
        cursor = this.startBulletSection(cursor, 'Key Deliverables', proposal.keyDeliverables);
        cursor = this.drawBulletList(proposal.keyDeliverables, cursor);

        const tableHeight = this.calculateTimelineTableHeight(proposal.projectTimeline);

        if (!this.willFit(cursor, tableHeight + 30)) {
            this.newPage(cursor);
        }
        cursor.y -= 15;
        cursor = this.drawSectionTitle('Project Timeline', cursor);
        cursor = this.drawSimpleTable(
            [
                'Phase',
                'Duration'
            ], proposal.projectTimeline.map(item => [
                item.phase,
                item.duration
            ]), cursor
        );

        const riskHeight = this.calculateSectionHeight(proposal.riskMitigation, item => item.mitigation);
        if (!this.willFit(cursor, riskHeight)) {
            this.newPage(cursor);
        }
        cursor.y -= 15;
        cursor = this.drawRiskSections('Risk Mitigation', proposal.riskMitigation, cursor);

        const complianceHeight = this.calculateTextHeight(proposal.complianceStatement, 460, this.font, 11)
        if (!this.willFit(cursor, complianceHeight + 30)) {
            this.newPage(cursor);
        }
        cursor.y -= 15;
        cursor = this.drawSectionTitle('Compliance Statement', cursor);
        cursor = this.drawWrappedText(proposal.complianceStatement, 65, cursor, 460)

        const pricingHeight = this.calculateTextHeight(proposal.commercial.pricingStrategy, 460, this.font, 11)
        if (!this.willFit(cursor, pricingHeight + 30)) {
            this.newPage(cursor);
        }
        cursor.y -= 15;
        cursor = this.drawSectionTitle('Pricing Strategy', cursor);
        cursor = this.drawWrappedText(proposal.commercial.pricingStrategy, 65, cursor, 460)

        const paymentHeight = this.calculateTextHeight(proposal.commercial.paymentTerms, 460, this.font, 11)
        if (!this.willFit(cursor, paymentHeight + 30)) {
            this.newPage(cursor);
        }
        cursor.y -= 15;
        cursor = this.drawSectionTitle('Payment Terms', cursor);
        cursor = this.drawWrappedText(proposal.commercial.paymentTerms, 65, cursor, 460)

        cursor.y -= 15;
        cursor = this.drawSectionTitle('Commercial Considerations', cursor);
        cursor = this.drawBulletList(proposal.commercial.commercialConsiderations, cursor)

        cursor.y -= 15;
        cursor = this.startBulletSection(cursor, 'Assumptions', proposal.assumptions);
        cursor = this.drawBulletList(proposal.assumptions, cursor);

        const conclusionHeight = this.calculateTextHeight(proposal.conclusion, 460, this.font, 11)
        if (!this.willFit(cursor, conclusionHeight + 30)) {
            this.newPage(cursor);
        }
        cursor.y -= 15;
        cursor = this.drawSectionTitle('Conclusion', cursor);
        cursor = this.drawWrappedText(proposal.conclusion, 65, cursor, 460)

        const declerationHeight = this.calculateTextHeight(proposal.declaration, 460, this.font, 11)
        if (!this.willFit(cursor, declerationHeight + 30)) {
            this.newPage(cursor);
        }
        cursor.y -= 15;
        cursor = this.drawSectionTitle('Declaration', cursor);
        cursor = this.drawWrappedText(proposal.declaration, 65, cursor, 460)

        this.drawPageFooters();

        const pdfBytes = await this.pdf.save();

        const isoDate = new Date().toISOString().replace('T', ' ').replace('Z', '').split('.')[0];

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="Tender-Proposal-${isoDate}.pdf"`,
        );

        res.send(Buffer.from(pdfBytes));
    }

    // ------------------------------------------------

    private drawCoverPage(page: PDFPage, company: CompanyProfile, tender: Tender) {
        page.drawText('Government Tender Proposal', {
            x: 110,
            y: 730,
            size: 28,
            font: this.bold,
            color: rgb(0.18, 0.36, 0.65),
        });

        page.drawLine({
            start: { x: 80, y: 720 },
            end: { x: 515, y: 720 },
            thickness: 1,
        });

        const documentNumber = `TP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${tender.id.slice(0, 6)}`;
        page.drawText('Document No.', {
            x: 100,
            y: 680,
            size: 15,
            font: this.bold,
        });

        page.drawText(documentNumber, {
            x: 100,
            y: 655,
            size: 20,
            font: this.font,
        });

        page.drawText('Tender', {
            x: 100,
            y: 590,
            size: 15,
            font: this.bold,
        });

        page.drawText(tender.title, {
            x: 100,
            y: 565,
            size: 20,
            font: this.font,
        });

        page.drawText('Prepared By', {
            x: 100,
            y: 500,
            size: 15,
            font: this.bold,
        });

        page.drawText(company.companyName, {
            x: 100,
            y: 475,
            size: 18,
            font: this.font,
        });

        page.drawText('Industry', {
            x: 100,
            y: 410,
            size: 15,
            font: this.bold,
        });

        page.drawText(company?.industry || '', {
            x: 100,
            y: 385,
            size: 18,
            font: this.font,
        });

        page.drawText('GST Number', {
            x: 100,
            y: 320,
            size: 15,
            font: this.bold,
        });

        page.drawText(company?.gstNumber || '', {
            x: 100,
            y: 295,
            size: 18,
            font: this.font,
        });

        page.drawText('Website', {
            x: 100,
            y: 230,
            size: 15,
            font: this.bold,
        });

        page.drawText(company?.website || '', {
            x: 100,
            y: 205,
            size: 18,
            font: this.font,
        });

        page.drawText('Generate Date', {
            x: 100,
            y: 140,
            size: 15,
            font: this.bold,
        });

        page.drawText(
            new Date().toLocaleDateString('en-IN'),
            {
                x: 100,
                y: 115,
                size: 13,
                font: this.font,
            },
        );
    }

    private calculateTimelineTableHeight(rows: { phase: string; duration: string }[]): number {
        let height = 30; // header
        rows.forEach(row => {
            const phaseHeight =
                this.calculateTextHeight(
                    row.phase,
                    220,
                    this.font,
                    11,
                );

            const durationHeight =
                this.calculateTextHeight(
                    row.duration,
                    180,
                    this.font,
                    11,
                );

            height += Math.max(
                phaseHeight,
                durationHeight,
                24,
            ) + 8;
        });

        return height;
    }

    private drawHeader(cursor: PdfCursor) {
        cursor.page.drawText('AI Bid Assistant', {
            x: this.left,
            y: cursor.y,
            size: 12,
            font: this.bold,
        });

        cursor.y -= 25;

        cursor.page.drawText('Government Tender Proposal', {
            x: this.left,
            y: cursor.y,
            size: 22,
            font: this.bold,
        });

        cursor.y -= 12;

        cursor.page.drawLine({
            start: { x: this.left, y: cursor.y },
            end: { x: this.right, y: cursor.y },
            thickness: 1,
        });
        cursor.y -= 30;
        return cursor;
    }

    // ------------------------------------------------

    private drawSectionTitle(title: string, cursor: PdfCursor): PdfCursor {
        cursor.page.drawText(title, {
            x: this.left,
            y: cursor.y,
            size: 15,
            font: this.bold,
        });

        cursor.y -= 5;

        cursor.page.drawLine({
            start: { x: this.left, y: cursor.y },
            end: { x: this.right, y: cursor.y },
            thickness: 1,
            color: rgb(0.25, 0.45, 0.80)
        });
        cursor.y -= 20
        return cursor;
    }

    private drawFooter(page: PDFPage, pageNumber: number, totalPages: number) {
        page.drawLine({
            start: { x: 50, y: 40 },
            end: { x: 545, y: 40 },
            thickness: 0.5,
        });

        page.drawText(
            'Powered by Pinaka IT Solutions',
            {
                x: 50,
                y: 25,
                size: 9,
                font: this.font,
            },
        );

        const text = `Page ${pageNumber} of ${totalPages}`;
        const width = this.font.widthOfTextAtSize(text, 9);
        page.drawText(text,
            {
                x: this.right - width,
                y: 25,
                size: 9,
                font: this.font,
            },
        );
    }

    private drawPageFooters(): void {

        const pages = this.pdf.getPages();
        const totalPages = pages.length;
        pages.forEach((page, index) => {
            this.drawFooter(page, index + 1, totalPages);

        });
    }

    private drawSimpleTable(headers: string[], rows: [string, string][], cursor: PdfCursor): PdfCursor {

        const startX = this.left;
        const col1Width = 250;
        const col2Width = 225;

        const paddingX = 10;
        const paddingY = 8;

        // ---------------- Header ----------------

        const headerHeight = 28;

        cursor.page.drawRectangle({
            x: startX,
            y: cursor.y - headerHeight,
            width: col1Width,
            height: headerHeight,
            borderWidth: 0.6,
            borderColor: rgb(0.8, 0.8, 0.8),
            color: rgb(0.94, 0.96, 1), // Light blue header
        });

        cursor.page.drawRectangle({
            x: startX + col1Width,
            y: cursor.y - headerHeight,
            width: col2Width,
            height: headerHeight,
            borderWidth: 0.6,
            borderColor: rgb(0.8, 0.8, 0.8),
            color: rgb(0.94, 0.96, 1),
        });

        cursor.page.drawText(headers[0], {
            x: startX + paddingX,
            y: cursor.y - headerHeight + paddingY,
            size: 11,
            font: this.bold,
        });

        cursor.page.drawText(headers[1], {
            x: startX + col1Width + paddingX,
            y: cursor.y - headerHeight + paddingY,
            size: 11,
            font: this.bold,
        });

        cursor.y -= headerHeight;

        // ---------------- Rows ----------------

        rows.forEach(([leftText, rightText]) => {
            const leftHeight = this.calculateTextHeight(
                leftText,
                col1Width - (paddingX * 2),
                this.font,
                11,
            );

            const rightHeight = this.calculateTextHeight(
                rightText || '-',
                col2Width - (paddingX * 2),
                this.font,
                11,
            );

            const rowHeight = Math.max(leftHeight, rightHeight) + 12;

            // Left Cell
            cursor.page.drawRectangle({
                x: startX,
                y: cursor.y - rowHeight,
                width: col1Width,
                height: rowHeight,
                borderWidth: 0.5,
                borderColor: rgb(0.85, 0.85, 0.85),
            });

            // Right Cell
            cursor.page.drawRectangle({
                x: startX + col1Width,
                y: cursor.y - rowHeight,
                width: col2Width,
                height: rowHeight,
                borderWidth: 0.5,
                borderColor: rgb(0.85, 0.85, 0.85),
            });

            // Left Text
            cursor.page.drawText(leftText, {
                x: startX + paddingX,
                y: cursor.y - paddingY - 10,
                size: 11,
                font: this.bold,
            });

            // Right Text
            cursor.page.drawText(rightText || '-', {
                x: startX + col1Width + paddingX,
                y: cursor.y - paddingY  - 10,
                size: 11,
                font: this.font,
            });

            // Move to next row
            cursor.y -= rowHeight;
        });

        cursor.y -= 15;

        return cursor;
    }

    private drawWrappedText(text: string, x: number, cursor: PdfCursor, width: number): PdfCursor {
        const textData = text ?? '';
        const words = textData?.split(' ');

        let line = '';

        words.forEach(word => {
            const test = line + word + ' ';

            if (this.font.widthOfTextAtSize(test, 11) > width) {
                this.ensureSpace(cursor);
                cursor.page.drawText(line, {
                    x,
                    y: cursor.y,
                    font: this.font,
                    size: 11,
                });

                cursor.y -= 16;

                line = word + ' ';
            }
            else {
                line = test;
            }

        });

        if (line) {
            this.ensureSpace(cursor);
            cursor.page.drawText(line, {
                x,
                y: cursor.y,
                font: this.font,
                size: 11,
            });

            cursor.y -= 16;
        }

        return cursor;
    }

    private drawBulletList(items: string[], cursor: PdfCursor): PdfCursor {
        if (items?.length > 0) {
            items?.forEach(item => {
                this.ensureSpace(cursor);
                cursor = this.drawWrappedText(`• ${item}`, 65, cursor, 460);

                cursor.y -= 8;
            });
        }

        return cursor;
    }

    private drawProposalSections(title: string, items: ProposalSection[], cursor: PdfCursor): PdfCursor {

        cursor = this.drawSectionTitle(title, cursor);

        items.forEach(item => {

            if (!this.willFit(cursor, 80)) {
                this.newPage(cursor);
            }

            cursor.page.drawText(item.title, {
                x: 65,
                y: cursor.y,
                font: this.bold,
                size: 12,
            });

            cursor.y -= 18;

            cursor = this.drawWrappedText(
                item.description,
                75,
                cursor,
                430,
            );

            cursor.y -= 10;

            cursor.page.drawLine({
                start: { x: 65, y: cursor.y },
                end: { x: 530, y: cursor.y },
                thickness: .4,
                color: rgb(.85, .85, .85),
            });

            cursor.y -= 18;
        });

        return cursor;
    }

    private drawRiskSections(title: string, items: RiskMitigation[], cursor: PdfCursor): PdfCursor {

        cursor = this.drawSectionTitle(title, cursor);

        items.forEach(item => {

            const requiredHeight = this.calculateTextHeight(item.mitigation, 430, this.font, 11) + 45;

            if (!this.willFit(cursor, requiredHeight)) {
                this.newPage(cursor);
            }

            cursor.page.drawText(item.title, {
                x: 65,
                y: cursor.y,
                font: this.bold,
                size: 12,
            });

            cursor.y -= 18;

            cursor = this.drawWrappedText(
                item.mitigation,
                75,
                cursor,
                430,
            );

            cursor.y -= 10;

            cursor.page.drawLine({
                start: { x: 65, y: cursor.y },
                end: { x: 530, y: cursor.y },
                thickness: .4,
                color: rgb(.85, .85, .85),
            });

            cursor.y -= 18;
        });

        return cursor;
    }

    private calculateSectionHeight<T>(items: T[], getContent: (item: T) => string): number {

        let totalHeight = 30; // Section title

        items.forEach((item) => {

            // Title
            totalHeight += 18;

            // Body
            totalHeight += this.calculateTextHeight(
                getContent(item),
                430,
                this.font,
                11,
            );

            // Divider + spacing
            totalHeight += 28;
        });

        return totalHeight;
    }

    private calculateTextHeight(text: string, maxWidth: number, font: PDFFont, fontSize: number): number {
        const textData = text ?? '';
        const words = textData?.split(' ');

        let line = '';
        let lines = 1;

        words?.forEach(word => {
            const test = line + word + ' ';

            if (font.widthOfTextAtSize(test, fontSize) > maxWidth) {
                lines++;
                line = word + ' ';
            } else {
                line = test;
            }
        });

        return lines * 16; // 16px line height
    }

    private ensureSpace(cursor: PdfCursor): void {

        if (cursor.y > this.bottomMargin)
            return;

        cursor.page = this.pdf.addPage([595, 842]);
        cursor.y = 800;

        this.drawWatermark(cursor);
        this.drawHeader(cursor);
    }

    private drawWatermark(cursor: PdfCursor) {

        cursor.page.drawText('PINAKA', {
            x: 170,
            y: 430,
            size: 65,
            font: this.bold,
            color: rgb(0.93, 0.93, 0.93),
            opacity: 0.38,
            rotate: degrees(45)
        });

        cursor.page.drawText('IT SOLUTIONS', {
            x: 200,
            y: 360,
            size: 65,
            font: this.bold,
            color: rgb(0.93, 0.93, 0.93),
            opacity: 0.38,
            rotate: degrees(45)
        });
    }

    private getBulletListHeight(items: string[]): number {
        if (!items?.length)
            return 0;

        let height = 0;

        items.forEach(item => {
            height += this.calculateTextHeight(
                `• ${item}`,
                460,
                this.font,
                11,
            );

            height += 8;
        });

        return height;
    }

    private newPage(cursor: PdfCursor): void {
        cursor.page = this.pdf.addPage([595, 842]);
        cursor.y = 800;

        this.drawWatermark(cursor);

        cursor = this.drawHeader(cursor); // Enable if header require on every new page
    }

    private willFit(cursor: PdfCursor, requiredHeight: number): boolean {
        const bottomMargin = 60;
        return cursor.y - requiredHeight >= bottomMargin;
    }

    private startBulletSection(cursor: PdfCursor, title: string, items: string[]): PdfCursor {

        const requiredHeight = Math.min(this.getBulletListHeight(items), 120);

        if (!this.willFit(cursor, requiredHeight)) {
            this.newPage(cursor);
        }

        return this.drawSectionTitle(title, cursor);
    }
}