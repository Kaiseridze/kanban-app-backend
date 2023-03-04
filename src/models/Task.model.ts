import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true,
		default: 'Untitled',
	},
	description: {
		type: String,
	},
	board_id: {
		type: String,
		require: true,
	},
});

export default mongoose.model('Task', TaskSchema);
