import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Create a __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve(__dirname, "../uploads");

    // Check if the uploads directory exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Exporting the upload middleware to handle multiple fields
export const upload = multer({ storage });
