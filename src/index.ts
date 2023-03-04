import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { ProjectRoute, BoardRoute, TaskRoute } from './routes';

const app = express();
const PORT = 5000;

mongoose
	.connect(
		'mongodb+srv://admin:13G5l1hYBDaBxN1O@cluster0.efz3j8i.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log('db OK');
	})
	.catch((err) => {
		console.log('db error', err);
	});

app.use(express.json());
app.use(cors());

app.use(ProjectRoute);
app.use(BoardRoute);
app.use(TaskRoute);

app.get('/', (req: Request, res: Response) => {
	res.status(200).send('Work!');
});
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
