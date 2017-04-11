import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RestoreService {
  private restoreEmailUrl: string = `${APP_CONST['api']}restore`;
  private updatePasswordUrl: string = `${APP_CONST['api']}update`;
  private headers: Headers = new Headers({'content-type': 'application/json'});

  constructor(
    private http: Http
  ) {}

  public sendUserEmail(email: string): Observable<Response> {
    const params = { user_email: email };
    return this.http.post(this.restoreEmailUrl, params, {headers: this.headers})
      .catch((error: Response) => this.onError(error));
  }
  public updatePassword(password: string): Observable<Response> {
    const params = { password };
    return this.http.put(this.updatePasswordUrl, params, {headers: this.headers})
      .do((response: Response) => this.onRestoreSuccess(response))
      .catch((error: Response) => this.onError(error));
  }

  private onRestoreSuccess(response: Response) {
    console.log(response);
    // TODO: logic for handling success password update
  }
  private onError(error: Response) {
    const message = error || 'Server Error';
    return Observable.throw(message);
  }
}
