import { RestorePasswordComponent } from './restore-password.component';
import { validationMessages } from '../../common/validation-messages';

describe('RestorePasswordComponent', () => {
  let comp: RestorePasswordComponent;
  let restoreServiceMock;
  let formBuilderMock;
  beforeAll(() => {
    restoreServiceMock = jasmine.createSpyObj('restoreServiceMock', ['updatePassword']);
    formBuilderMock = jasmine.createSpyObj('formBuilderMock', ['group']);
    comp = new RestorePasswordComponent(formBuilderMock, restoreServiceMock);
  });

  describe('ngOnInit', () => {
    const formGroupCallResult = {
      test: 'form group test result'
    };
    beforeAll(() => {
      formBuilderMock.group.and.returnValue(formGroupCallResult);
      comp.ngOnInit();
    });
    it('should set restorePasswordForm equal to FormBuilder.group call result', () => {
      expect(comp.restorePasswordForm as any).toEqual(formGroupCallResult);
    });
    it('should set error messages list for every field validator', () => {
      comp.passwordValidators = validationMessages['userPassword'];
    });
  });
  describe('updatePassword', () => {
    let testFromValue;
    beforeAll(() => {
      testFromValue = {
        value: 'test password'
      };
      const passwordForm = jasmine.createSpyObj('passwordForm', ['get']);
      passwordForm.get.and.returnValue(testFromValue);
      comp.restorePasswordForm = passwordForm;
      comp.updatePassword();
    });

    it('should call RestoreService.updatePassword', () => {
      expect(restoreServiceMock.updatePassword).toHaveBeenCalled();
    });

    it('should call RestoreService.updatePassword with form value', () => {
      expect(restoreServiceMock.updatePassword).toHaveBeenCalledWith(testFromValue.value);
    });
  });
});
