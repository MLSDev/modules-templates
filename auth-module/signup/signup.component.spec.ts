import { SignUpComponent } from './signup.component';
import { FormGroup } from '@angular/forms';
import { validationMessages } from '../common/validation-messages';

describe('SignUpComponent', () => {
  let comp: SignUpComponent;
  let authServiceMock;
  let formBuilderMock;
  beforeAll(() => {
    authServiceMock = jasmine.createSpyObj('authServiceMock', ['signUp']);
    formBuilderMock = jasmine.createSpyObj('formBuilderMock', ['group']);
    comp = new SignUpComponent(formBuilderMock, authServiceMock);
  });

  describe('ngOnInit', () => {
    const formGroupCallResult = {
      test: 'form group test result'
    };
    beforeAll(() => {
      formBuilderMock.group.and.returnValue(formGroupCallResult);
      comp.ngOnInit();
    });
    it('should set signUpForm equal to FormBuilder.group call result', () => {
      expect(comp.signUpForm as any).toEqual(formGroupCallResult);
    });
    it('should set error messages list for every field validator', () => {
      comp.nameValidators = validationMessages['userName'];
      comp.emailValidators = validationMessages['userEmail'];
      comp.passwordValidators = validationMessages['userPassword'];
    });
  });
  describe('signUp', () => {
    let formValues;
    beforeAll(() => {
      formValues = {
        userName: 'test name',
        userEmail: 'test email',
        userPassword: 'test password'
      };
      comp.signUpForm = <FormGroup> {
        value: formValues
      };
      comp.signUp();
    });

    it('should call AuthService.signUp', () => {
      expect(authServiceMock.signUp).toHaveBeenCalled();
    });

    it('should call AuthService.signUp with form value', () => {
      expect(authServiceMock.signUp).toHaveBeenCalledWith(formValues);
    });
  });
});
