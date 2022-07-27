/**
 * Project Routes
 * url base: /projects
 */
import { Router } from 'express';

const router = Router();

/**
 * @controllers
 */
import { createProjects, getProjects } from './projects-controllers';

/**
 * @routes
 */
router.get('/', getProjects);
router.post('/', createProjects);
router.put('/:id');
router.delete('/:id');
router.get('/:id');

export default router;
