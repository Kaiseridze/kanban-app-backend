import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
	title: {
		type: String,
		default: 'Untitled',
		require: true,
	},
	description: {
		type: String,
	},
	boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
});

export default mongoose.model('Project', ProjectSchema);
