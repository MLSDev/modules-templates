import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Headers } from '@angular/http';

describe('AuthService', () => {
  let authService: AuthService;
  let mockHttp;
  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['post']);
    authService = new AuthService(mockHttp);
  });
  describe('signIn', () => {
    const testCredentials = {
      userEmail: 'test@email.com',
      userPassword: 'test password'
    };
    it('should return testData in signIn Observable subscription', () => {
      const testData = {
        user_id: 'test id',
        token: 'test token'
      };
      let responseData = null;
      mockHttp.post.and.returnValue(Observable.of(testData));
      const signInCall = authService.signIn(testCredentials);
      signInCall.subscribe(
        (response) => { responseData = response; },
        (error) => { responseData = error; }
      );

      expect(responseData).toEqual(testData);
    });
    it('should return testError in signIn Observable subscription', () => {
      const testError = new Error('Test error message');
      let responseData = null;
      mockHttp.post.and.returnValue(Observable.throw(testError));
      const signInCall = authService.signIn(testCredentials);
      signInCall.subscribe(
        (response) => { responseData = response; },
        (error) => { responseData = error; }
      );

      expect(responseData).toEqual(testError);
    });
    it('should call mockHttp.post method with specific parameters', () => {
      mockHttp.post.and.returnValue(Observable.of(false));
      authService.signIn(testCredentials);

      const requestParams = {
        user_email: testCredentials.userEmail,
        password: testCredentials.userPassword
      };
      const requestUrl = `${APP_CONST['api']}sign-in`;
      const headers = {
        headers: new Headers({'content-type': 'application/json'})
      };
      expect(mockHttp.post).toHaveBeenCalledWith(requestUrl, requestParams, headers);
    });
  });
  describe('signUp', () => {
    const testCredentials = {
      userName: 'test user name',
      userEmail: 'test@email.com',
      userPassword: 'test password'
    };
    it('should return testData in signUp Observable subscription', () => {
      const testData = {
        user_id: 'test id',
        token: 'test token'
      };
      let responseData = null;
      mockHttp.post.and.returnValue(Observable.of(testData));
      const signInCall = authService.signUp(testCredentials);
      signInCall.subscribe(
        (response) => { responseData = response; },
        (error) => { responseData = error; }
      );

      expect(responseData).toEqual(testData);
    });
    it('should return testError in signUp Observable subscription', () => {
      const testError = new Error('Test error message');
      let responseData = null;
      mockHttp.post.and.returnValue(Observable.throw(testError));
      const signInCall = authService.signUp(testCredentials);
      signInCall.subscribe(
        (response) => { responseData = response; },
        (error) => { responseData = error; }
      );

      expect(responseData).toEqual(testError);
    });
    it('should call mockHttp.post method with specific parameters', () => {
      mockHttp.post.and.returnValue(Observable.of(false));
      authService.signUp(testCredentials);

      const requestParams = {
        user_name: testCredentials.userName,
        user_email: testCredentials.userEmail,
        password: testCredentials.userPassword
      };
      const requestUrl = `${APP_CONST['api']}sign-up`;
      const headers = {
        headers: new Headers({'content-type': 'application/json'})
      };
      expect(mockHttp.post).toHaveBeenCalledWith(requestUrl, requestParams, headers);
    });
  });
});
