import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>();

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  emitSubmitEvent() {
    this.formSubmitted.emit(this.myForm.value);

  }

  createForm() {
    this.myForm = this.fb.group({
      product: this.fb.control(''),
      brand: this.fb.control(''),
    });
  }
}
