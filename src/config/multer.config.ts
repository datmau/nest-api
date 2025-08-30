import { diskStorage } from "multer";
import { extname } from "path";

const localStorage = diskStorage({
      destination: "./uploads/avatars",
      filename: (req, file, cb) => {
        const uniqueSufix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSufix + extname(file.originalname));
      },
    })

export const multerOptions  = {
    storage: localStorage,
    limits: {
          fileSize: 5 * 1024 * 1024,
        },
        fileFilter: (req, file, cb) => {
          if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            cb(new Error('Invalid file type'), false);
            return;
          }
          cb(null, true);
        }
}