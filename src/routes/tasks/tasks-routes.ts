/**
 * Task Routes
 * url base: /tasks
 */
import { Router } from 'express';

const router = Router();

/**
 * @controllers
 */
import { createTask, getTasks } from './tasks-controllers';

/**
 * @routes
 */
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id');
router.delete('/:id');
router.get('/:id');

export default router;
