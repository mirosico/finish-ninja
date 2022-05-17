import multer from "multer";
import {GridFsStorage} from "multer-gridfs-storage";
import dotenv from "dotenv";
dotenv.config({path: '../.env'});

const storage = new GridFsStorage({
    url: process.env.DB,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            bucketName: "photos",
            filename: `${Date.now()}-superhero-${file.originalname}`,
        };
    },
});

export default  multer({ storage: storage });
