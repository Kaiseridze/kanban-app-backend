import { Request, Response } from 'express';

import BoardModel from '../models/Board.model';
import ProjectModel from '../models/Project.model';
import TaskModel from '../models/Task.model';

export const create = async (req: Request, res: Response) => {
	try {
		const { project_id, title } = req.body;
		const doc = new BoardModel({
			title,
			project_id,
		});
		const board = await doc.save();

		await ProjectModel.findByIdAndUpdate(project_id, {
			$push: { boards: board },
		});

		res.status(200).json(board);
	} catch (error) {
		res.status(500).send({ message: 'Failed to create a board' });
	}
};

export const getAll = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const boards = await BoardModel.find({ project_id: id }).populate('tasks').exec();
		res.status(200).json(boards);
	} catch (error: any) {
		res.status(404).json({ message: 'Failed to get a boards' });
	}
};

export const update = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title } = req.body;
	try {
		const board = await BoardModel.findByIdAndUpdate(
			id,
			{
				title,
			},
			{ new: true }
		);
		board!.save();
		res.status(200).json(board);
	} catch (error) {
		res.status(500).json({ message: 'Failed to update a board' });
	}
};

export const remove = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		await BoardModel.findByIdAndDelete(id);
		await ProjectModel.findOneAndUpdate(
			{ boards: id },
			{
				$pull: { boards: id },
			}
		);
		await TaskModel.deleteMany({ board_id: id });
		return res.status(200).json({ success: true });
	} catch (error) {
		res.status(500).send({ message: 'Failed to remove a board' });
	}
};
