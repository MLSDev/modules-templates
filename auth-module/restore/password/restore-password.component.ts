import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestoreService } from '../../common/restore/restore.service';
import { matcherValidator } from '../../common/matcher-validator';
import { validationMessages } from '../../common/validation-messages';

@Component({
  selector: 'restore-password',
  templateUrl: './restore-password.component.pug'
})
export class RestorePasswordComponent {
  public restorePasswordForm: FormGroup;
  public passwordValidators: any;

  constructor(
    private fb: FormBuilder,
    private restoreService: RestoreService
  ) {}

  public ngOnInit(): void {
    this.restorePasswordForm = this.fb.group({
      userPassword: ['', [
        Validators.required
      ]],
      passwordConfirm: ''
    }, { validator: matcherValidator });

    this.passwordValidators = validationMessages['userPassword'];
  }
  public updatePassword(): void {
    this.restoreService.updatePassword(
      this.restorePasswordForm
        .get('userPassword')
        .value
    );
  }
}
