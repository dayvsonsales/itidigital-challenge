import Password from '@domain/Password';
import IManagePasswordRules from '@rules/IManagePasswordRules';
import IPasswordValidatorService from '@services/IPasswordValidatorService';

import { inject, injectable } from 'tsyringe';

@injectable()
class PasswordValidatorService implements IPasswordValidatorService {
  constructor(
    @inject('ManagePasswordRules')
    private passwordRules: IManagePasswordRules,
  ) {}

  validate(password: string): boolean {
    const rules = this.passwordRules.rules();
    const isValidPassword = new Password(password, rules).isValid();

    return isValidPassword;
  }
}

export default PasswordValidatorService;
