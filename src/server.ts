import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cron from 'node-cron';
import 'express-async-errors';

import CronUpdateToken from '@crons/CronUpdateToken';
// import CronClienteReducaoService from '@crons/CronClienteReducaoService';
// import CronClientesSuspensosService from '@crons/CronClientesSuspensosService';
// import CronClientesDevedoresService from '@crons/CronClientesDevedoresService';
// import CronClientesFaturasLateFortyDaysService from '@crons/CronClientesFaturasLateFortyDaysService';
// import CronClientesFaturasToWinTwoDaysService from '@crons/CronClientesFaturasToWinTwoDaysService';

import AppError from './errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', error: err.message });
  }
  console.error(err);
  return response.status(500).json({
    status: 'error',
    error: 'Internal server error..',
  });
});

app.listen(Number(process.env.PORT) || 3333, () => {
  const cronUpdateToken = new CronUpdateToken();
  // const cronClienteReducao = new CronClienteReducaoService();
  // const cronClientesSuspensos = new CronClientesSuspensosService();
  // const cronClientesDevedores = new CronClientesDevedoresService();
  // const cronClientesFaturasLateFortyDays =
  //   new CronClientesFaturasLateFortyDaysService();
  // const cronClientesFaturasToWinTwoDays =
  //   new CronClientesFaturasToWinTwoDaysService();

  cron.schedule('0 0 5,10,15,25,1 * *', () => cronUpdateToken.execute(), {
    timezone: 'America/Sao_Paulo',
  });

  // cron.schedule('0 11 * * 1-5', () => cronClienteReducao.execute(), {
  //   timezone: 'America/Sao_Paulo',
  // });
  // cron.schedule('0 11 * * 1-5', () => cronClientesSuspensos.execute(), {
  //   timezone: 'America/Sao_Paulo',
  // });
  // cron.schedule('0 11 * * 1-5', () => cronClientesDevedores.execute(), {
  //   timezone: 'America/Sao_Paulo',
  // });
  // cron.schedule(
  //   '0 11 * * 1-5',
  //   () => cronClientesFaturasLateFortyDays.execute(),
  //   {
  //     timezone: 'America/Sao_Paulo',
  //   },
  // );
  // cron.schedule(
  //   '0 11 * * 1-5',
  //   () => cronClientesFaturasToWinTwoDays.execute(),
  //   {
  //     timezone: 'America/Sao_Paulo',
  //   },
  // );

  console.log(`🚀 Server started on port ${process.env.PORT || 3333}`);
});
