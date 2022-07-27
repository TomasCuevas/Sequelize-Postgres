/**
 * Project Routes
 * url base: /projects
 */
import { Router } from 'express';

const router = Router();

/**
 * @controllers
 */
import {
  createProjects,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from './projects-controllers';

/**
 * @routes
 */
router.get('/', getProjects);
router.post('/', createProjects);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.get('/:id', getProject);

export default router;
