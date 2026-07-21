import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import pdfParse from 'pdf-parse';

@Injectable()
export class PdfParserService {
  async extractText(filePath: string): Promise<string> {
    const buffer = fs.readFileSync(filePath);

    const result = await pdfParse(buffer);

    return result.text;
  }
}