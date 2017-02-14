import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';

const app: express.Application = express();

app.use(logger('dev'));
app.use(helmet());
app.use(cookieParser());
app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client')));

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  let err = new Error('Not Found');
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message
  });
});

export { app }
