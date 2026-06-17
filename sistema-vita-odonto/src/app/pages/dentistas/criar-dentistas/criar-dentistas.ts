import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DentistaService } from '../../../services/dentista-service';
import { EspecialidadeService } from '../../../services/especialidade-service';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-criar-dentistas',
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
  templateUrl: './criar-dentistas.html',
  styleUrl: './criar-dentistas.css',
})
export class CriarDentistas implements OnInit {
  nome: string;
  cpf: string;
  email: string;
  cro: string;

  especialidades: any[] = [];
  especialidadesSelecionadas: number[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CriarDentistas>,
    private dentistaService: DentistaService,
    private especialidadeService: EspecialidadeService
  ) {
    this.nome = data?.nome ?? '';
    this.cpf = data?.cpf ?? '';
    this.email = data?.email ?? '';
    this.cro = data?.cro ?? '';
    this.especialidadesSelecionadas = data?.especialidades?.map((e: any) => e.id) ?? [];
  }

  salvar() {
    const dados = {
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      cro: this.cro,
      especialidades: this.especialidadesSelecionadas
    };

    const requisicao = this.data?.id
      ? this.dentistaService.editar(this.data.id, dados)
      : this.dentistaService.criar(dados);

    requisicao.subscribe(() => this.dialogRef.close(true));
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  ngOnInit() {
    this.especialidadeService.listar().subscribe(lista => {
      this.especialidades = lista;
    });
  }
}

