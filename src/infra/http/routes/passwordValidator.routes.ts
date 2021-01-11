import { Router } from 'express';
import PasswordValidatorController from '../controllers/PasswordValidatorController';

const passwordValidatorRouter = Router();
const passwordValidatorController = new PasswordValidatorController();

passwordValidatorRouter.post('/validate', passwordValidatorController.index);

export default passwordValidatorRouter;
