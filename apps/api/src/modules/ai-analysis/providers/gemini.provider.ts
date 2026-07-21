import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiProvider {
  private readonly client: GoogleGenAI;
  private readonly model: string;

  constructor(private readonly configService: ConfigService) {
    this.client = new GoogleGenAI({
      apiKey: this.configService.get<string>('GEMINI_API_KEY')!,
    });

    this.model = this.configService.get<string>('GEMINI_MODEL') ?? 'gemini-2.5-flash';
  }

  async analyze(prompt: string): Promise<string> {
    const response = await this.client.models.generateContent({
      model: this.model,
      contents: prompt,
    });

    return response.text ?? '';
  }

  async listModels() {
    const models = await this.client.models.list();

    for await (const model of models) {
        console.log(model.name);
    }
    }
}