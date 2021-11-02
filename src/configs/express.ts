import compression from 'compression';
import cors from 'cors';
import express from 'express';
import expressWinston from 'express-winston';
import helmet from 'helmet';
import morgan from 'morgan';
import { transports, format } from 'winston';

import { Routes } from '../routes';
import { ConsoleLogger } from './logger';

class App {
  public app : express.Application;

  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();

    this.middlewares(this.app);
    this.configLogger(this.app);
    this.configErrorLogger(this.app);
    this.routePrv.routes(this.app);
  }

  private middlewares(expressApp: express.Application): void {
    expressApp.use(express.json());
    expressApp.use(cors());
    expressApp.use(helmet());
    expressApp.use(compression({ level: 9 }));
  }

  private configLogger(expressApp: express.Application) {
    this.configureRequestsLogger(expressApp);
    this.configureConsoleLogger(expressApp);
  }

  private configureRequestsLogger(expressApp: express.Application) {
    expressApp.use(
      expressWinston.logger({
        level: 'http',
        transports: [
          new transports.File({
            filename: './logs/http-logs.log',
            maxsize: 5242880,
            maxFiles: 5,
            level: 'http',
          }),
        ],
        format: format.combine(format.colorize(), format.json()),
        meta: true,
        expressFormat: true,
        colorize: false,
      })
    );
  }

  private configureConsoleLogger(expressApp: express.Application) {
    const myStream = {
      write: (text: string) => {
        ConsoleLogger.info(text);
      },
    };

    expressApp.use(morgan('combined', { stream: myStream }));
  }

  private configErrorLogger(expressApp: express.Application) {
    expressApp.use(
      expressWinston.errorLogger({
        transports: [
          new transports.File({
            filename: './logs/error-logs.log',
            maxsize: 5242880,
            maxFiles: 5,
            level: 'error',
          }),
          new transports.Console(),
        ],
        format: format.combine(format.colorize(), format.json()),
      })
    );
  }
}

export default new App().app;
