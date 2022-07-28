import express from 'express';

import { sequelize } from '../database/config';
import projectsRoutes from '../routes/projects/projects-routes';
import tasksRoutes from '../routes/tasks/tasks-routes';

export class Server {
  private app;
  private port;
  private paths = {
    projects: '/projects',
    tasks: '/tasks',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;

    this.connectToDatabase();
    this.middlewares();
    this.routes();
  }

  private async connectToDatabase() {
    try {
      await sequelize.sync({ force: false });
      console.log('Conectado a la base de datos.');
    } catch (error) {
      console.log(error);
      console.log('Error al conectarse con la base de datos.');
    }
  }

  private middlewares() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(this.paths.projects, projectsRoutes);
    this.app.use(this.paths.tasks, tasksRoutes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server iniciado en el puerto ${this.port}`);
    });
  }
}
