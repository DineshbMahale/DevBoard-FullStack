import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.html'
})
export class ConfirmDialogComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}