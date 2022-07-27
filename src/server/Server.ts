import express from 'express';
import { sequelize } from '../database/config';

export class Server {
  private app;
  private port;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;

    this.connectToDatabase();
  }

  private async connectToDatabase() {
    try {
      await sequelize.sync({ force: true });
      console.log('Conectado a la base de datos.');
    } catch (error) {
      console.log(error);
      console.log('Error al conectarse con la base de datos.');
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server iniciado en el puerto ${this.port}`);
    });
  }
}
