import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmar-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmar-dialog.html',
})
export class ConfirmarDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { titulo: string; mensagem: string },
    private dialogRef: MatDialogRef<ConfirmarDialog>
  ) { }

  confirmar() {
    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}