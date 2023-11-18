import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generic-modal-edit',
  templateUrl: './generic-modal-edit.component.html',
  styleUrls: ['./generic-modal-edit.component.scss']
})
export class GenericModalEditComponent {
  form: FormGroup;
  objectKeys = Object.keys;

  constructor(
    public dialogRef: MatDialogRef<GenericModalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group(
      Object.keys(data).reduce((obj: { [k: string]: any }, key: string) => {
        obj[key] = [data[key] || '', Validators.required];
        return obj;
      }, {})
    );
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel(){
    this.dialogRef.close();
  }

}
