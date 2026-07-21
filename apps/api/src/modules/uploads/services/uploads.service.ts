import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
  upload(file: Express.Multer.File) {
    return {
      fileName: file.filename,
      filePath: file.path.replace(/\\/g, '/'),
      mimeType: file.mimetype,
      size: file.size,
    };
  }
}