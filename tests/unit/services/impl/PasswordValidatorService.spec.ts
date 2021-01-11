import IManagePasswordRules from '@rules/IManagePasswordRules';
import PasswordValidatorService from '@services/impl/PasswordValidatorService';
import IPasswordValidatorService from '@services/IPasswordValidatorService';
import FakeManagePasswordRules from '../../rules/fakes/FakeManagePasswordRules';

describe('Password Validator', () => {
  let passwordValidatorService: IPasswordValidatorService;
  let fakeManagePasswordRules: IManagePasswordRules;

  beforeAll(() => {
    fakeManagePasswordRules = new FakeManagePasswordRules();
    passwordValidatorService = new PasswordValidatorService(
      fakeManagePasswordRules,
    );
  });

  test('blank passwords are considered invalid', async () => {
    expect(await passwordValidatorService.validate('')).toBe(false);
  });

  test('white spaced passwords are considered invalid', async () => {
    expect(await passwordValidatorService.validate('AbTp9!fok AbTp9!fok')).toBe(
      false,
    );

    expect(await passwordValidatorService.validate('AbTp9!fokAbTp9!fok ')).toBe(
      false,
    );
  });

  test('passwords with repeated characters are invalid', async () => {
    expect(await passwordValidatorService.validate('AbTp9!fokk')).toBe(false);

    expect(await passwordValidatorService.validate('AbTp9!foookk')).toBe(false);
  });

  test('passwords without numeric digit are invalid', async () => {
    expect(await passwordValidatorService.validate('AbTp!fok')).toBe(false);
  });

  test('passwords without uppercase character are invalid', async () => {
    expect(await passwordValidatorService.validate('bp8!fok')).toBe(false);
  });

  test('passwords without lowercase character are invalid', async () => {
    expect(await passwordValidatorService.validate('ABTP10!FOK')).toBe(false);
  });

  test('passwords without special character are invalid', async () => {
    expect(await passwordValidatorService.validate('AbTp9fok')).toBe(false);
  });

  test('passwords less than 9 characters are invalid', async () => {
    expect(await passwordValidatorService.validate('Ap9!ok')).toBe(false);
  });

  test('passwords that respect all rules are valid', async () => {
    expect(await passwordValidatorService.validate('AbTp9!fok')).toBe(true);

    expect(await passwordValidatorService.validate('BcTp9!@#$%fok')).toBe(true);

    expect(await passwordValidatorService.validate('BcTp9!@#$%10')).toBe(true);

    expect(await passwordValidatorService.validate('!2cTp9@#$%10-')).toBe(true);

    expect(
      await passwordValidatorService.validate('!@#$%^&*()-+123456789cTpABCD0'),
    ).toBe(true);
  });
});
