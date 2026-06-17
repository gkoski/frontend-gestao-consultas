import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { PacienteService } from '../../../services/paciente-service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-criar-pacientes',
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgxMaskDirective
  ],
  templateUrl: './criar-pacientes.html',
  styleUrl: './criar-pacientes.css',
})
export class CriarPacientes {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CriarPacientes>,
    private pacienteService: PacienteService
  ) {
    this.nome = data?.nome ?? '';
    this.cpf = data?.cpf ?? '';
    this.email = data?.email ?? '';
    this.telefone = data?.telefone ?? '';
  }

  salvar() {
    const dados = { nome: this.nome, cpf: this.cpf, email: this.email, telefone: this.telefone };

    const requisicao = this.data?.id
      ? this.pacienteService.editar(this.data.id, dados)
      : this.pacienteService.criar(dados);

    requisicao.subscribe(() => this.dialogRef.close(true));
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}

