import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now().substring(0,7)}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export {upload};