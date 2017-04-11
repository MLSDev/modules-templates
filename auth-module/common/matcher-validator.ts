import { FormGroup } from '@angular/forms';

export const matcherValidator = (formGroup: FormGroup): {[key: string]: any} => {
  const controlKeys = Object.keys(formGroup.controls);
  const control = formGroup.get(controlKeys[0]);
  const controlMatch = formGroup.get(controlKeys[1]);
  if (control.pristine || controlMatch.pristine) {
    return null;
  }
  if (control.value === controlMatch.value) {
    return null;
  }
  return {
    match: true
  };
};
