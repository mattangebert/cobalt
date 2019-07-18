import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormOptionComponent } from './form-option.component';
import { FormOptionElementComponent } from './form-option-element/form-option-element.component';
import { CommonModule } from '@angular/common';

/**
 * Module for creating dynamic Forms using FormOptionsComponent & FormOptionElementComponent
 */
@NgModule({
  declarations: [FormOptionComponent, FormOptionElementComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FormOptionComponent
  ]
})
export class FormOptionModule { }
