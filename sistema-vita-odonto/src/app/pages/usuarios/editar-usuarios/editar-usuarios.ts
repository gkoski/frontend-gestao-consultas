import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../../services/usuario-service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-editar-usuarios',
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, NgxMaskDirective],
  templateUrl: './editar-usuarios.html',
  styleUrl: './editar-usuarios.css'
})
export class EditarUsuarios {

  nome: string;
  cpf: string;
  email: string;
  senha: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditarUsuarios>,
    private usuarioService: UsuarioService
  ) {
    this.nome = data.nome;
    this.cpf = data.cpf;
    this.email = data.email;
    this.senha = data.senha;
  }

  salvar() {
    const dados = {
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      senha: this.senha
    };

    this.usuarioService.editar(this.data.id, dados).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}