import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { emailPattern } from '../common/email-pattern';
import { AuthService } from '../common/auth/auth.service';
import { matcherValidator } from '../common/matcher-validator';
import { validationMessages } from '../common/validation-messages';

@Component({
  selector: 'sign-up-form',
  templateUrl: './signup.component.pug'
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  public nameValidators: any;
  public emailValidators: any;
  public passwordValidators: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.signUpForm = this.fb.group({
      userName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      userEmail: ['', [
        Validators.required,
        Validators.pattern(emailPattern)
      ]],
      passwordGroup: this.fb.group({
        userPassword: ['', [
          Validators.required
        ]],
        passwordConfirm: ''
      }, {
        validator: matcherValidator
      })
    });

    this.nameValidators = validationMessages['userName'];
    this.emailValidators = validationMessages['userEmail'];
    this.passwordValidators = validationMessages['userPassword'];
  }
  public signUp(): void {
    this.authService.signUp(this.signUpForm.value);
  }
}
