export default interface IPasswordValidatorService {
  validate(password: string): boolean;
}
