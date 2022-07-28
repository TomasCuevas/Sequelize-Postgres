import { Request, Response } from 'express';

/**
 * @models
 */
import { Project } from '../../database/models/Project';
import { Task } from '../../database/models/Task';

export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.findAll();

    res.status(200).json({
      projects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error en el servidor. Contacte con un administrador.',
    });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);

    if (!project) {
      res.status(404).json({
        msg: 'No existe projecto con el ID ingresado.',
      });
      return;
    }

    res.status(200).json({
      project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error en el servidor. Contacte con un administrador.',
    });
  }
};

export const getProjectTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tasks = await Task.findAll({
      where: { projectId: id },
    });

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

export const createProjects = async (req: Request, res: Response) => {
  try {
    const { name, priority, description } = req.body;

    const newProject = await Project.create({
      name,
      priority,
      description,
    });

    res.status(201).json({
      newProject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error en el servidor. Contacte con un administrador.',
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, priority, description } = req.body;

    const project: any = await Project.findByPk(id);
    if (!project) {
      res.status(404).json({
        msg: 'No existe projecto con el ID ingresado.',
      });
      return;
    }

    project.name = name;
    project.priority = priority;
    project.description = description;

    await project.save();

    res.status(201).json({
      project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error en el servidor. Contacte con un administrador.',
    });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await Project.destroy({
      where: { id },
    });

    if (project === 0) {
      res.status(404).json({
        msg: 'No existe projecto con el ID ingresado.',
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
