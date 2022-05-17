import dotenv from "dotenv";
dotenv.config({path: '../.env'});
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import connection from "./db.js";
import heroRoutes from './routes/heroes.js'
import upload from "./routes/upload.js";
const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/heroes', heroRoutes);

app.use("/file", upload);

app.get('/', (req, res) => {
    res.send("Hello to API")
})


connection();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))



