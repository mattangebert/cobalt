import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormOptionElementComponent } from './form-option-element.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OptionInput } from '../model/option-input';
import { toFormGroup } from '../service/option-control-functions';

describe('FormOptionElementComponent', () => {
  let component: FormOptionElementComponent;
  let fixture: ComponentFixture<FormOptionElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOptionElementComponent ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOptionElementComponent);
    component = fixture.componentInstance;

    const option = new OptionInput({
        key: 'paddleLeftHeight',
        label: 'Left Paddel Height',
        type: 'number',
        value: 100,
        min: 10,
        max: 600,
        order: 3
    });
    component.option = option;
    component.form = toFormGroup([option]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true', () => {
    expect(component.isValid).toBeTruthy();
  });
});
