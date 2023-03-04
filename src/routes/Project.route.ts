import express from 'express';

import { ProjectController } from '../controllers';

const router = express.Router();

router.get('/projects', ProjectController.getAll);
router.get('/projects/:id', ProjectController.getById);
router.post('/projects', ProjectController.create);
router.patch('/projects/:id', ProjectController.update)
router.delete('/projects/:id', ProjectController.remove);

export default router;
