import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { emailPattern } from '../common/email-pattern';
import { AuthService } from '../common/auth/auth.service';
import { validationMessages } from '../common/validation-messages';

@Component({
  selector: 'sign-in-form',
  templateUrl: './signin.component.pug'
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;
  public emailValidators: Object;
  public passwordValidators: Object;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.signInForm = this.fb.group({
      userEmail: ['', [
        Validators.required,
        Validators.pattern(emailPattern)
      ]],
      userPassword: ['', [
        Validators.required
      ]]
    });

    this.emailValidators = validationMessages['userEmail'];
    this.passwordValidators = validationMessages['userPassword'];
  }
  public signIn(): void {
    this.authService.signIn(this.signInForm.value);
  }
}
