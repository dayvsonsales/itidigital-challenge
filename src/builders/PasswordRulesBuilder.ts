import PasswordRule from '../domain/PasswordRule';

class PasswordRulesBuilder {
  private passwordRules: PasswordRule[];

  constructor() {
    this.passwordRules = [];
  }

  public addRule(passwordRule: PasswordRule): PasswordRulesBuilder {
    this.passwordRules.push(passwordRule);

    return this;
  }

  public build(): PasswordRule[] {
    return this.passwordRules;
  }
}

export default PasswordRulesBuilder;
