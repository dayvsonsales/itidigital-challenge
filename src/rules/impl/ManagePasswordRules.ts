import PasswordRule from '@domain/PasswordRule';
import PasswordRulesBuilder from '@builders/PasswordRulesBuilder';
import IManagePasswordRules from '../IManagePasswordRules';

class ManagePasswordRules implements IManagePasswordRules {
  private passwordRules: PasswordRule[];

  constructor() {
    this.setupRules();
  }

  public rules(): PasswordRule[] {
    return this.passwordRules;
  }

  private setupRules() {
    this.passwordRules = new PasswordRulesBuilder()
      .addRule({
        name: 'Nove ou mais caracteres',
        validate: password => password.length >= 9,
      })
      .addRule({
        name: 'Ao menos um dígito',
        validate: password => !!password.match(/[0-9]/),
      })
      .addRule({
        name: 'Ao menos 1 letra minúscula',
        validate: password => !!password.match(/[a-z]/),
      })
      .addRule({
        name: 'Ao menos 1 letra maiúscula',
        validate: password => !!password.match(/[A-Z]/),
      })
      .addRule({
        name: 'Ao menos 1 caractere especial ',
        validate: password => !!password.match(/[!@#$%^&*()-+]/),
      })
      .addRule({
        name: 'Não possuir caracteres repetidos dentro do conjunto',
        validate: password =>
          new Set(password.split('')).size === password.length,
      })
      .addRule({
        name: 'Não pode ter espaço em branco',
        validate: password => password.trim() === password,
      })
      .build();
  }
}

export default ManagePasswordRules;
