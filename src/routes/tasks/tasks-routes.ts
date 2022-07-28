/**
 * Task Routes
 * url base: /tasks
 */
import { Router } from 'express';

const router = Router();

/**
 * @controllers
 */
import { createTask, deleteTask, getTask, getTasks, updateTask } from './tasks-controllers';

/**
 * @routes
 */
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/:id', getTask);

export default router;
