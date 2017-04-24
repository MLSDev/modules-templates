import { RestoreEmailComponent } from './restore-email.component';
import { validationMessages } from '../../common/validation-messages';

describe('RestoreEmailComponent', () => {
  let comp: RestoreEmailComponent;
  let restoreServiceMock;
  let formBuilderMock;
  beforeAll(() => {
    restoreServiceMock = jasmine.createSpyObj('restoreServiceMock', ['sendUserEmail']);
    formBuilderMock = jasmine.createSpyObj('formBuilderMock', ['group']);
    comp = new RestoreEmailComponent(formBuilderMock, restoreServiceMock);
  });

  describe('ngOnInit', () => {
    const formGroupCallResult = {
      test: 'form group test result'
    };
    beforeAll(() => {
      formBuilderMock.group.and.returnValue(formGroupCallResult);
      comp.ngOnInit();
    });
    it('should set restoreEmailForm equal to FormBuilder.group call result', () => {
      expect(comp.restoreEmailForm as any).toEqual(formGroupCallResult);
    });
    it('should set error messages list for every field validator', () => {
      comp.emailValidators = validationMessages['userEmail'];
    });
  });
  describe('sendEmail', () => {
    let testFromValue;
    beforeAll(() => {
      testFromValue = {
        value: 'test email'
      };
      const emailForm = jasmine.createSpyObj('emailForm', ['get']);
      emailForm.get.and.returnValue(testFromValue);
      comp.restoreEmailForm = emailForm;
      comp.sendEmail();
    });

    it('should call RestoreService.sendUserEmail', () => {
      expect(restoreServiceMock.sendUserEmail).toHaveBeenCalled();
    });

    it('should call RestoreService.sendUserEmail with form value', () => {
      expect(restoreServiceMock.sendUserEmail).toHaveBeenCalledWith(testFromValue.value);
    });
  });
});
