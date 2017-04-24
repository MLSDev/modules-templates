import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: '[control-validation]',
  template: `
    <ng-content></ng-content>
    <div class="validation-message"
         [hidden]="!message"
         [innerHtml]="message"
    ></div>
  `
})
export class ControlValidationComponent implements AfterViewInit, OnDestroy {
  @ContentChild('controlElement') private inputElm: ElementRef;
  @Input() private rules: any;
  @Input() private control: FormControl;
  @Input() private timing: number = 500;
  private message: string = '';
  private subscription: any;

  public ngAfterViewInit(): void {
    this.subscription = this.control.valueChanges
      .debounceTime(this.timing)
      .subscribe(() => this.validationWatcher());
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  private validationWatcher() {
    if ((this.control.touched || this.control.dirty) && this.control.errors) {
      Object.keys(this.control.errors).map((key) => {
        this.message = this.rules[key];
        this.inputElm.nativeElement.classList.add('invalid-error');
      });
    } else {
      this.message = '';
      this.inputElm.nativeElement.classList.remove('invalid-error');
    }
  }
}
