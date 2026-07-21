import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
        const id = req.params.id as string;
        const folder = join(process.cwd(), 'uploads', 'tenders', id);

        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }

        cb(null, folder);
    },
    filename: (_req, file, callback) => {
      const uniqueName = Date.now() + '_' + Math.round(Math.random() * 1e9);

      callback(null, uniqueName + extname(file.originalname));
    },
  }),

  fileFilter: (_req, file, callback) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(
        new Error('Only PDF and DOC/DOCX files are allowed'),
        false,
      );
    }

    callback(null, true);
  },

  limits: {
    fileSize: 25 * 1024 * 1024,
  },
};