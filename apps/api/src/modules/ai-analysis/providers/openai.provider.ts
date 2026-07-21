import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiProvider {
  private readonly client: OpenAI;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.client = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async analyze(prompt: string) {
    try {
        const model = this.configService.get<string>('OPENAI_MODEL') ?? 'gpt-5-mini';

        const response = await this.client.responses.create({
                model,
                input: prompt,
            });

        return response;
    } catch (err: any) {
        console.error(err);

        throw err;
    }
  }
}