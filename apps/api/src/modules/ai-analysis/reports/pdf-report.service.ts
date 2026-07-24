import { Injectable } from '@nestjs/common';
import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont, degrees } from 'pdf-lib';
import type { Response } from 'express';

interface PdfCursor {
    page: PDFPage;
    y: number;
}

@Injectable()
export class PdfReportService {
    private readonly left = 50;
    private readonly right = 545;
    private readonly bottomMargin = 80;
    private font!: PDFFont;
    private bold!: PDFFont;
    private pdf!: PDFDocument

    async generate(report: any, res: Response) {
        this.pdf = await PDFDocument.create();

        const page = this.pdf.addPage([595, 842]); // A4

        this.font = await this.pdf.embedFont(StandardFonts.Helvetica);
        this.bold = await this.pdf.embedFont(StandardFonts.HelveticaBold);

        let cursor = { page, y: 800 };

        this.drawWatermark(cursor);
        cursor = this.drawHeader(cursor);

        cursor = this.drawSectionTitle('Tender Information', cursor);

        cursor = this.drawTable(
            [
                ['Tender Name', report.title],
                ['Status', report.status],
                ['Generated On', new Date(report.analyzedAt).toLocaleString('en-IN')]
            ],
            cursor,
        );

        const boxWidth = this.right - this.left;
        const contentWidth = boxWidth - 30;

        let reasonsHeight = 0;

        report?.recommendation?.reasons?.forEach((reason: string) => {
            reasonsHeight += this.calculateTextHeight(reason, contentWidth, this.font, 10);
        });

        const boxHeight = reasonsHeight + 120;
        cursor = this.drawRecommendationBox(report.recommendation, report.score, cursor, boxHeight, contentWidth)

        const summaryHeight = this.calculateTextHeight(report.summary, 460, this.font, 11)
        if (!this.willFit(cursor, summaryHeight + 30)) {
            this.newPage(cursor);
        }
        cursor.y -= 25;
        cursor = this.drawSectionTitle('Executive Summary', cursor);

        cursor = this.drawWrappedText(report.summary, 65, cursor, 460)

        cursor.y -= 15;
        cursor = this.startBulletSection(cursor, 'Eligibility', report.eligibility);
        cursor = this.drawBulletList(report.eligibility, cursor);

        cursor.y -= 15;
        cursor = this.startBulletSection(cursor, 'Technical Requirements', report.technicalRequirements);
        cursor = this.drawBulletList(report.technicalRequirements, cursor);

        cursor.y -= 15;
        cursor = this.startBulletSection(cursor, 'Financial Requirements', report.financialRequirements);
        cursor = this.drawBulletList(report.financialRequirements, cursor);

        const datesHeight = 4 * 24 + 20;
        if (!this.willFit(cursor, datesHeight + 30)) {
            this.newPage(cursor);
        }
        cursor.y -= 15;
        cursor = this.drawSectionTitle('Important Dates', cursor);
        cursor = this.drawDatesTable(report.importantDates, cursor);

        cursor.y -= 15;
        cursor = this.startBulletSection(cursor, 'Risks', report.risks);
        cursor = this.drawBulletList(report.risks, cursor);

        this.drawPageFooters();

        const pdfBytes = await this.pdf.save();

        const isoDate = new Date().toISOString().replace('T', ' ').replace('Z', '');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="Tender-Analysis-${isoDate}.pdf"`,
        );

        res.send(Buffer.from(pdfBytes));
    }

    // ------------------------------------------------

    private drawHeader(cursor: PdfCursor) {
        cursor.page.drawText('AI Bid Assistant', {
            x: this.left,
            y: cursor.y,
            size: 12,
            font: this.bold,
        });

        cursor.y -= 25;

        cursor.page.drawText('AI Tender Analysis Report', {
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

    // ------------------------------------------------

    private drawDatesTable(dates: any, cursor: PdfCursor): PdfCursor {
        const rows = [
            ['Publication Date', dates?.publicationDate],
            ['Closing Date', dates?.closingDate],
            ['Opening Date', dates?.openingDate],
            ['Pre-Bid Meeting', dates?.preBidMeeting],
        ];
        const startX = 50;
        const col1 = 170;
        const rowHeight = 24;

        rows.forEach(([label, value]) => {
            cursor.page.drawRectangle({
                x: startX,
                y: cursor.y - rowHeight + 5,
                width: col1,
                height: rowHeight,
                borderWidth: 0.5,
                borderColor: rgb(0.8, 0.8, 0.8),
                color: rgb(1, 1, 1)
            });

            cursor.page.drawRectangle({
                x: startX + col1,
                y: cursor.y - rowHeight + 5,
                width: 325,
                height: rowHeight,
                borderWidth: 0.5,
                borderColor: rgb(0.8, 0.8, 0.8),
                color: rgb(1, 1, 1)
            });
            cursor.page.drawText(`${label}:`, {
                x: startX + 8,
                y: cursor.y - 10,
                size: 11,
                font: this.bold,
            });

            cursor.page.drawText(String(value ?? '-'), {
                x: startX + col1 + 8,
                y: cursor.y - 10,
                size: 11,
                font: this.font
            });

            cursor.y -= 20;
        });
        cursor.y -= 10
        return cursor;
    }

    // ------------------------------------------------

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

    private drawTable(rows: [string, any][], cursor: PdfCursor): PdfCursor {

        const startX = 50;
        const col1 = 170;
        const rowHeight = 24;

        rows.forEach(([key, value]) => {

            cursor.page.drawRectangle({
                x: startX,
                y: cursor.y - rowHeight + 5,
                width: col1,
                height: rowHeight,
                borderWidth: 0.5,
                borderColor: rgb(0.8, 0.8, 0.8),
                color: rgb(1, 1, 1)
            });

            cursor.page.drawRectangle({
                x: startX + col1,
                y: cursor.y - rowHeight + 5,
                width: 325,
                height: rowHeight,
                borderWidth: 0.5,
                borderColor: rgb(0.8, 0.8, 0.8),
                color: rgb(1, 1, 1)
            });

            cursor.page.drawText(key, {
                x: startX + 8,
                y: cursor.y - 10,
                size: 11,
                font: this.bold,
            });
            cursor.page.drawText(value || '-', {
                x: startX + col1 + 8,
                y: cursor.y - 10,
                size: 11,
                font: this.font,
            });

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

    private drawRecommendationBox(recommendation: any, score: number, cursor: PdfCursor, boxHeight: number, contentWidth: number): PdfCursor {
        cursor.page.drawRectangle({
            x: this.left,
            y: cursor.y - boxHeight,
            width: 495,
            height: boxHeight,
            borderWidth: 1,
            borderColor: rgb(0.75, 0.75, 0.75),
            color: rgb(0.98, 0.99, 0.98),
        });

        cursor.page.drawText('AI Recommendation', {
            x: this.left + 10,
            y: cursor.y - 18,
            font: this.bold,
            size: 13,
        });

        const color = this.getDecisionColor(recommendation?.decision);

        cursor.page.drawText(
            `Decision: ${recommendation?.decision}`,
            {
                x: this.left + 10,
                y: cursor.y - 40,
                font: this.bold,
                size: 12,
                color,
            },
        );

        cursor.page.drawText(
            `Score: ${score} / 100`,
            {
                x: this.left + 10,
                y: cursor.y - 60,
                font: this.bold,
                size: 11,
                color
            },
        );

        cursor.page.drawText(
            this.getScoreLabel(score),
            {
                x: this.left + 90,
                y: cursor.y - 60,
                size: 11,
                font: this.bold,
                color: rgb(0.3, 0.3, 0.3),
            },
        );

        cursor.page.drawText(
            `Confidence: ${recommendation?.confidence}`,
            {
                x: this.left + 10,
                y: cursor.y - 80,
                font: this.bold,
                size: 11,
            },
        );

        cursor.y = cursor.y - 100;

        recommendation?.reasons?.forEach((item: string) => {
            cursor = this.drawWrappedText(
                `• ${item}`,
                this.left + 15,
                cursor,
                contentWidth,
            );

            cursor.y -= 5;
        });

        return cursor;
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

    private getScoreLabel(score: number) {

        if (score >= 90)
            return '(Excellent)';

        if (score >= 75)
            return '(Good)';

        if (score >= 50)
            return '(Moderate)';

        return '(High Risk)';
    }

    private getDecisionColor(decision: string) {
        switch (decision) {
            case 'Strongly Recommended':
            case 'Recommended':
                return rgb(0, 0.55, 0);
            case 'Review Carefully':
                return rgb(0.85, 0.55, 0);
            default:
                return rgb(0.75, 0, 0);
        }
    }

    private ensureSpace(cursor: PdfCursor): void {

        if (cursor.y > this.bottomMargin)
            return;

        cursor.page = this.pdf.addPage([595, 842]);
        cursor.y = 800;

        this.drawWatermark(cursor);
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

        // cursor = this.drawHeader(cursor); // Enable if header require on every new page
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