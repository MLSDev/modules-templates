import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ISignIn } from '../sign-in.model';
import { ISignUp } from '../sign-up.model';

@Injectable()
export class AuthService {
  private signInUrl: string = `${APP_CONST['api']}sign-in`;
  private signUpUrl: string = `${APP_CONST['api']}sign-up`;
  private headers: Headers = new Headers({'content-type': 'application/json'});

  constructor(
    private http: Http
  ) {}

  public signIn(formParams: ISignIn): Observable<Response> {
    const params = {
      user_email: formParams.userEmail,
      password: formParams.userPassword
    };
    return this.http.post(this.signInUrl, params, {headers: this.headers})
      .do((response: Response) => this.onSuccessAuth(response))
      .catch((error: Response) => this.onError(error));
  }
  public signUp(formParams: ISignUp): Observable<Response> {
    const params = {
      user_name: formParams.userName,
      user_email: formParams.userEmail,
      password: formParams.userPassword
    };
    return this.http.post(this.signUpUrl, params, {headers: this.headers})
      .do((response: Response) => this.onSuccessAuth(response))
      .catch((error: Response) => this.onError(error));
  }

  private onSuccessAuth(response: Response) {
    // TODO: place logic for handling success response
    console.log(response);
  }
  private onError(error: Response) {
    const message = error || 'Server Error';
    return Observable.throw(message);
  }
}
