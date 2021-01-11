import { container } from 'tsyringe';

import IPasswordValidatorService from '@services/IPasswordValidatorService';
import PasswordValidatorService from '@services/impl/PasswordValidatorService';
import IManagePasswordRules from '@rules/IManagePasswordRules';
import ManagePasswordRules from '@rules/impl/ManagePasswordRules';

container.registerSingleton<IManagePasswordRules>(
  'ManagePasswordRules',
  ManagePasswordRules,
);

container.registerSingleton<IPasswordValidatorService>(
  'PasswordValidatorService',
  PasswordValidatorService,
);
