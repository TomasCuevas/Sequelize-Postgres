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

export const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) {
      res.status(404).json({
        msg: 'No existe tarea con el ID ingresado.',
      });
      return;
    }

    res.status(200).json({
      task,
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

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, done } = req.body;

    const task: any = await Task.findByPk(id);
    if (!task) {
      res.status(404).json({
        msg: 'No existe tarea con el ID ingresado.',
      });
      return;
    }

    task.name = name;
    task.done = done;

    await task.save();

    res.status(201).json({
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error en el servidor. Contacte con un administrador.',
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.destroy({
      where: { id },
    });

    if (task === 0) {
      res.status(404).json({
        msg: 'No existe tarea con el ID ingresado.',
      });
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error en el servidor. Contacte con un administrador.',
    });
  }
};
