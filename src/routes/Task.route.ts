import express from 'express';
import { TaskController } from '../controllers';

const router = express.Router();

router.post('/tasks', TaskController.create);
router.get('/tasks/:id', TaskController.getAll);
router.patch('/tasks/:boardId', TaskController.updatePosition);

export default router;
