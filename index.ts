import express, { Request, Response } from 'express';

const app = express();
const port = 4000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Project 2 Backend!');
});

app.listen(port, () => {
    console.log(`Project 2 Backend is running at http://localhost:${port}`);
})