import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema({
	title: {
		type: String,
		default: "Untitled"
	},
	project_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
		require: true,
	},
	tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

export default mongoose.model('Board', BoardSchema);
