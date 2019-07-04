import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOptionElementComponent } from './form-option-element.component';

describe('FormOptionElementComponent', () => {
  let component: FormOptionElementComponent;
  let fixture: ComponentFixture<FormOptionElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOptionElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOptionElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
