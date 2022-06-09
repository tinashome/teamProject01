import multer from "multer";
import path from "path";

const upload = multer({
  storage : multer.diskStorage({
    destination(req, file, done) {
      done(null, "src/views/uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
        done( null, path.basename(file.originalname, ext) + Date.now() + ext );
    },
  }),
  limits : { filzesize : 5 * 1024 * 1024 }
});

export { upload };