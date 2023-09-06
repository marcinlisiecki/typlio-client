import { FormControl, ValidationErrors } from '@angular/forms';

export const noWhitespaceValidator = (control: FormControl): ValidationErrors | null => {
  return (control.value || '').trim().length ? null : { whitespace: true };
};
