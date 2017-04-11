import { RestoreService } from './restore.service';
import { Observable } from 'rxjs';
import { Headers } from '@angular/http';

describe('RestoreService', () => {
  let restoreService: RestoreService;
  let mockHttp;
  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['post', 'put']);
    restoreService = new RestoreService(mockHttp);
  });
  describe('isRestoreActive', () => {
    // TODO: add tests after logic implementation
  });
  describe('sendUserEmail', () => {
    const testEmail = 'test@email.com';
    it('should return testData in sendUserEmail Observable subscription', () => {
      const testData = {test: 'data response'};
      let responseData = null;
      mockHttp.post.and.returnValue(Observable.of(testData));
      const methodCall = restoreService.sendUserEmail(testEmail);
      methodCall.subscribe(
        (response) => { responseData = response; },
        (error) => { responseData = error; }
      );

      expect(responseData).toEqual(testData);
    });
    it('should return testError in sendUserEmail Observable subscription', () => {
      const testError = new Error('Test error message');
      let responseData = null;
      mockHttp.post.and.returnValue(Observable.throw(testError));
      const methodCall = restoreService.sendUserEmail(testEmail);
      methodCall.subscribe(
        (response) => { responseData = response; },
        (error) => { responseData = error; }
      );

      expect(responseData).toEqual(testError);
    });
    it('should call mockHttp.post method with specific parameters', () => {
      mockHttp.post.and.returnValue(Observable.of(false));
      restoreService.sendUserEmail(testEmail);
      const requestParams = { user_email: testEmail };
      const requestUrl = `${APP_CONST['api']}restore`;
      const headers = {
        headers: new Headers({'content-type': 'application/json'})
      };
      expect(mockHttp.post).toHaveBeenCalledWith(requestUrl, requestParams, headers);
    });
  });
  describe('updatePassword', () => {
    const testPassword = 'test password';
    it('should return testData in updatePassword Observable subscription', () => {
      const testData = 'success';
      let responseData = null;
      mockHttp.put.and.returnValue(Observable.of(testData));
      const methodCall = restoreService.updatePassword(testPassword);
      methodCall.subscribe(
        (response) => { responseData = response; },
        (error) => { responseData = error; }
      );

      expect(responseData).toEqual(testData);
    });
    it('should return testError in updatePassword Observable subscription', () => {
      const testError = new Error('Test error message');
      let responseData = null;
      mockHttp.put.and.returnValue(Observable.throw(testError));
      const methodCall = restoreService.updatePassword(testPassword);
      methodCall.subscribe(
        (response) => { responseData = response; },
        (error) => { responseData = error; }
      );

      expect(responseData).toEqual(testError);
    });
    it('should call mockHttp.put method with specific parameters', () => {
      mockHttp.put.and.returnValue(Observable.of(false));
      restoreService.updatePassword(testPassword);
      const requestParams = { password: testPassword };
      const requestUrl = `${APP_CONST['api']}update`;
      const headers = {
        headers: new Headers({'content-type': 'application/json'})
      };
      expect(mockHttp.put).toHaveBeenCalledWith(requestUrl, requestParams, headers);
    });
  });
});
