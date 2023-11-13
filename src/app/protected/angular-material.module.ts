import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatTableModule, 
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatTableModule, 
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule
  ]
})
export class AngularMaterialModule { }
