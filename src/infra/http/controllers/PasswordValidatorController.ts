import PasswordValidatorService from '@services/impl/PasswordValidatorService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PasswordValidatorController {
  async index(request: Request, response: Response): Promise<Response> {
    const { password } = request.body;

    if (password === null || password === undefined) {
      return response.status(400).send({
        message: 'Bad request. Needs to pass a password',
      });
    }

    const passwordValidatorService = container.resolve(
      PasswordValidatorService,
    );

    const valid = await passwordValidatorService.validate(password);

    return response.json(valid);
  }
}
