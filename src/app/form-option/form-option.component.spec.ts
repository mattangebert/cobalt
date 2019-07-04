import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOptionComponent } from './form-option.component';

describe('FormOptionComponent', () => {
  let component: FormOptionComponent;
  let fixture: ComponentFixture<FormOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
