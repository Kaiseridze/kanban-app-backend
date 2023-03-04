import express from 'express';
import { BoardController } from '../controllers';

const router = express.Router();

router.post('/boards', BoardController.create);
router.get('/boards/:id', BoardController.getAll);
router.patch('/boards/:id', BoardController.update)
router.delete('/boards/:id', BoardController.remove);

export default router;
