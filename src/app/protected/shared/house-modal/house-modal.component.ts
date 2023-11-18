import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { House } from '../../interfaces/house.interface';


@Component({
  selector: 'app-house-modal',
  templateUrl: './house-modal.component.html',
  styleUrls: ['./house-modal.component.scss']
})
export class HouseModalComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<HouseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: House,
    private fb: FormBuilder
  ) {
    console.log(this.data)
    this.form = this.fb.group({
      name: [data.name || '', Validators.required],
      tables: [data.cantTables || '', Validators.required],
    });
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
