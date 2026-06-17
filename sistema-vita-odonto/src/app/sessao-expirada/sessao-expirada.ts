import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sessao-expirada',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './sessao-expirada.html',
})
export class SessaoExpirada {
  constructor(private dialogRef: MatDialogRef<SessaoExpirada>) { }

  logarNovamente() {
    this.dialogRef.close(true);
  }
}