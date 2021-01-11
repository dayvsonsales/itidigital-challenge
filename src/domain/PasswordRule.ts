export default interface PasswordRule {
  name: string;
  validate(value: string): boolean;
}
