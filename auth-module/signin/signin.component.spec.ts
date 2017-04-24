import { SignInComponent } from './signin.component';
import { FormGroup } from '@angular/forms';
import { validationMessages } from '../common/validation-messages';

describe('SignInComponent', () => {
  let comp: SignInComponent;
  let authServiceMock;
  let formBuilderMock;
  beforeAll(() => {
    authServiceMock = jasmine.createSpyObj('authServiceMock', ['signIn']);
    formBuilderMock = jasmine.createSpyObj('formBuilderMock', ['group']);
    comp = new SignInComponent(formBuilderMock, authServiceMock);
  });

  describe('ngOnInit', () => {
    const formGroupCallResult = {
      test: 'form group test result'
    };
    beforeAll(() => {
      formBuilderMock.group.and.returnValue(formGroupCallResult);
      comp.ngOnInit();
    });
    it('should set signInForm equal to FormBuilder.group call result', () => {
      expect(comp.signInForm as any).toEqual(formGroupCallResult);
    });
    it('should set error messages list for every field validator', () => {
      comp.emailValidators = validationMessages['userEmail'];
      comp.passwordValidators = validationMessages['userPassword'];
    });
  });
  describe('signIn', () => {
    let formValues;
    beforeAll(() => {
      formValues = {
        userEmail: 'test email',
        userPassword: 'test password'
      };
      comp.signInForm = <FormGroup> {
        value: formValues
      };
      comp.signIn();
    });

    it('should call AuthService.signIn', () => {
      expect(authServiceMock.signIn).toHaveBeenCalled();
    });

    it('should call AuthService.signIn with form value', () => {
      expect(authServiceMock.signIn).toHaveBeenCalledWith(formValues);
    });
  });
});
