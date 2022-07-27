import { Request, Response } from 'express';
import { Project } from '../../database/models/Project';

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
