import Password from '@domain/Password';
import IManagePasswordRules from '@rules/IManagePasswordRules';
import IPasswordValidatorService from '@services/IPasswordValidatorService';

import { inject, injectable } from 'tsyringe';

@injectable()
class PasswordValidatorService implements IPasswordValidatorService {
  constructor(
    @inject('ManagePasswordRules')
    private managePasswordRules: IManagePasswordRules,
  ) {}

  validate(password: string): boolean {
    const rules = this.managePasswordRules.rules();
    const isValidPassword = new Password(password, rules).isValid();

    return isValidPassword;
  }
}

export default PasswordValidatorService;
