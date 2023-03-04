import { Request, Response } from 'express';
import BoardModel from '../models/Board.model';
import ProjectModel from '../models/Project.model';

export const create = async (req: Request, res: Response) => {
	try {
		const { title, description } = req.body;
		const doc = new ProjectModel({
			title,
			description,
		});
		const project = await doc.save();
		res.status(200).send(project);
	} catch (error) {
		res.status(403).send({ message: 'Failed to create project' });
	}
};

export const getAll = async (req: Request, res: Response) => {
	try {
		const projects = await ProjectModel.find().exec();
		res.status(200).json(projects);
	} catch (error) {
		res.status(404).send('Projects not fount');
	}
};

export const getById = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		ProjectModel.findById(id, (err: any, doc: any) => {
			if (err) {
				console.log(err);
			}
			if (!doc) {
				return res.status(404).send('Project not found');
			}
			return res.status(200).json(doc);
		})
	} catch (error) {
		res.status(404).send({ message: 'Project not found' });
	}
};

export const remove = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		await ProjectModel.findByIdAndDelete(id);
		await BoardModel.deleteMany({ project_id: id });
		res.status(200).json({ success: 'true' });
	} catch (error) {
		res.status(500).send({ message: 'Failed to remove project' });
	}
};

export const update = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, description } = req.body;
	try {
		const project = await ProjectModel.findByIdAndUpdate(
			{ _id: id },
			{
				title,
				description,
			},
			{ new: true }
		);
		project!.save();
		res.status(200).json(project);
	} catch (error) {
		res.status(500).send({ message: 'Failed to update project' });
	}
};
