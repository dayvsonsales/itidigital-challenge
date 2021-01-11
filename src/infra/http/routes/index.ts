import { Router } from 'express';

import passwordValidator from '@infra/http/routes/passwordValidator.routes';

const routes = Router();

routes.use('/password-validator', passwordValidator);

export default routes;
