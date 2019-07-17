import { FormOptionComponent } from './form-option.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { OptionInput } from './model/option-input';
import { FormOptionElementComponent } from './form-option-element/form-option-element.component';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';

describe('FormOptionComponent', () => {
  let component: FormOptionComponent;
  let fixture: ComponentFixture<FormOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOptionComponent, FormOptionElementComponent ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const option = new OptionInput({
      key: 'paddleLeftHeight',
      label: 'Left Paddel Height',
      type: 'number',
      value: 100,
      min: 10,
      max: 600,
      order: 3
    });

    component.options = [option];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initalize payload as empty string', () => {
    expect(component.payLoad).toBe('');
  });

  it('should set payload on submit', () => {
    component.form = new FormGroup({
      first: new FormControl(),
      last: new FormControl()
    });

    component.form.setValue({first: 'Nancy', last: 'Drew'});

    component.onSubmit();

    expect(component.payLoad).not.toEqual('');
  });
});
