import { Router } from 'express';

import integrationRouter from './integration.routes';

const routes = Router();

routes.use('/integration-planetphone-hubsoft', integrationRouter);

export default routes;
