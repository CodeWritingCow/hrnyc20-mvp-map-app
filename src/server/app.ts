import express, { RequestHandler, NextFunction, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();
const controller = require('./controllers');
let port = process.env.PORT || 3000;

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 50
});

// Helper function for applying middleware to specific paths
const applyMiddleware = (middleware: RequestHandler, ...paths: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const pathCheck = paths.includes(req.path);
        pathCheck ? middleware(req, res, next) : next();
    };
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));
app.use(cors());
app.use(applyMiddleware(limiter, '/'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/api/homicides', (req, res) => {
    controller
        .getNypdData()
        .then((data: any) => {
            res.send(data.data);
        })
        .catch((err: any) => console.log(err));
});

app.get(`/api/homicides/:year`, (req, res) => {
    controller
        .getNypdData(req.params.year)
        .then((data: any) => {
            res.send(data.data);
        })
        .catch((err: any) => console.log(err));
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

module.exports = app;
