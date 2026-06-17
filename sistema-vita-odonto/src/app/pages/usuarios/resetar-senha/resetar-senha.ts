import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../../services/usuario-service';

@Component({
  selector: 'app-resetar-senha',
  imports: [MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './resetar-senha.html',
  styleUrl: './resetar-senha.css',
})
export class ResetarSenha {
  novaSenha = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ResetarSenha>,
    private usuarioService: UsuarioService
  ) { }

  salvar() {
    if (this.novaSenha && this.novaSenha.trim()) {
      this.usuarioService.resetarSenha(this.data.id, this.novaSenha).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
