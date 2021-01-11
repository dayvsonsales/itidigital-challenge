import PasswordRule from './PasswordRule';

class Password {
  constructor(private value: string, private rules: PasswordRule[]) {}

  isValid() {
    if (!this.rules) {
      return false;
    }

    for (const rule of this.rules) {
      if (!rule || !rule.validate(this.value)) {
        return false;
      }
    }

    return true;
  }
}

export default Password;
