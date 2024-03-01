import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestDataService } from '../../services/test-data.service';

@Component({
  selector: 'app-generic-modal-edit',
  templateUrl: './generic-modal-edit.component.html',
  styleUrls: ['./generic-modal-edit.component.scss']
})
export class GenericModalEditComponent {
  form: FormGroup;
  objectKeys = Object.keys;
  isMenu: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<GenericModalEditComponent>,
    private testDataService: TestDataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    
    this.isMenu = data.hasOwnProperty('Producto');

    this.form = this.fb.group(
      Object.keys(data).reduce((obj: { [k: string]: any }, key: string) => {
        obj[key] = [data[key] || '', Validators.required];
        return obj;
      }, {})
    );
  }

  save() {
    if (this.form.valid) {
      if (this.isMenu) {
        const input = document.getElementById('input-imagen') as HTMLInputElement;
        this.testDataService.setListTable = input.files![0];
      }
      this.dialogRef.close(this.form.value);
    }
  }

  cancel(){
    this.dialogRef.close();
  }

}
