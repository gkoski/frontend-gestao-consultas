// cancelar-consulta-dialog.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cancelar-consulta',
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './cancelar-consulta.html',
})
export class CancelarConsulta {
  motivo = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CancelarConsulta>
  ) { }

  confirmar() {
    if (this.motivo && this.motivo.trim()) {
      this.dialogRef.close(this.motivo);   // devolve o motivo
    }
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}