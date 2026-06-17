import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../../services/usuario-service';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-criar-usuarios',
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    NgxMaskDirective
  ],
  templateUrl: './criar-usuarios.html',
  styleUrl: './criar-usuarios.css',
})
export class CriarUsuarios {
  nome = '';
  cpf = '';
  email = '';
  senha = '';
  perfil = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CriarUsuarios>,
    private usuarioService: UsuarioService
  ) {
    this.nome = data?.nome ?? '';
    this.cpf = data?.cpf ?? '';
    this.email = data?.email ?? '';
    this.senha = '';
    this.perfil = data?.perfil ?? 'DENTISTA';
  }

  salvar() {
    const dados = {
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      senha: this.senha,
      perfil: this.perfil,
      ativo: true,
    };

    const req = this.data?.id
      ? this.usuarioService.editar(this.data.id, dados)
      : this.usuarioService.criar(dados);

    req.subscribe(() => this.dialogRef.close(true));
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}

