import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatFormFieldModule, MatGridListModule } from '@angular/material';
import { MatInputModule, MatListModule, MatCardModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule
  ]
})
export class ShareModule { }
