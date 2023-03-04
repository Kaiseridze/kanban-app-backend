import { Request, Response } from 'express';

import TaskModel from '../models/Task.model';
import BoardModel from '../models/Board.model';

export const create = async (req: Request, res: Response) => {
	try {
		const { board_id, title } = req.body;
		const doc = new TaskModel({
			title,
			board_id,
		});
		const task = await doc.save();
		await BoardModel.findByIdAndUpdate(board_id, {
			$push: { tasks: task },
		});
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ message: 'Failed to create a task' });
	}
};

export const updatePosition = async (req: Request, res: Response) => {
	try {
		const { boardId } = req.params;
		await BoardModel.findByIdAndUpdate(boardId, { tasks: req.body });
		res.status(200).json({success: true})
	} catch (error) {
		res.status(500).json({ message: 'Failed to update position of task' });
	}
};

export const getAll = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const tasks = await TaskModel.find({ board_id: id }).exec();
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ message: 'Failed to get a tasks' });
	}
};
