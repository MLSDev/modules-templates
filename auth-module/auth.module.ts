import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { AuthService } from './common/auth/auth.service';
import { RestoreService } from './common/restore/restore.service';
import { RestoreComponent } from './restore/restore.component';
import { RestoreEmailComponent } from './restore/email/restore-email.component';
import { RestorePasswordComponent } from './restore/password/restore-password.component';
import { ControlValidationComponent } from './common/control-validation.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent,
    RestoreComponent,
    RestoreEmailComponent,
    RestorePasswordComponent,
    ControlValidationComponent
  ],
  providers: [
    AuthService,
    RestoreService
  ],
  exports: [
    SignInComponent,
    SignUpComponent,
    RestoreComponent,
    RestoreEmailComponent,
    RestorePasswordComponent
  ]
})
export class AuthModule {}
