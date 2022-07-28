import { Request, Response } from 'express';

/**
 * @models
 */
import { Task } from '../../database/models/Task';

export const getTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll();

    res.status(200).json({
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error en el servidor. Contacte con un administrador.',
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { name, projectId } = req.body;

    const newTask = await Task.create({
      name,
      projectId,
    });

    res.status(201).json({
      newTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error en el servidor. Contacte con un administrador.',
    });
  }
};
