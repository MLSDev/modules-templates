import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestoreService } from '../../common/restore/restore.service';
import { emailPattern } from '../../common/email-pattern';
import { validationMessages } from '../../common/validation-messages';

@Component({
  selector: 'restore-email',
  templateUrl: './restore-email.component.pug'
})
export class RestoreEmailComponent implements OnInit {
  public restoreEmailForm: FormGroup;
  public emailValidators: Object;

  constructor(
    private fb: FormBuilder,
    private restoreService: RestoreService
  ) {}

  public ngOnInit(): void {
    this.restoreEmailForm = this.fb.group({
      userEmail: ['', [
        Validators.required,
        Validators.pattern(emailPattern)
      ]]
    });

    this.emailValidators = validationMessages['userEmail'];
  }
  public sendEmail(): void {
    this.restoreService.sendUserEmail(this.restoreEmailForm.get('userEmail').value);
  }
}
