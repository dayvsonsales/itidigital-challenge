import PasswordRule from '@domain/PasswordRule';

export default interface IManagePasswordRules {
  rules(): PasswordRule[];
}
