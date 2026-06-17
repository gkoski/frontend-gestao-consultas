import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ConsultaService } from '../../../services/consulta-service';
import { PacienteService } from '../../../services/paciente-service';
import { DentistaService } from '../../../services/dentista-service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-criar-consulta',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule
  ],
  templateUrl: './criar-consulta.html',
})
export class CriarConsulta implements OnInit {
  pacientes: any[] = [];
  dentistas: any[] = [];

  idPaciente: number | null = null;
  idDentista: number | null = null;
  descricao = '';
  dataInicio: Date | null = null;
  dataFim: Date | null = null;
  horaInicio = '';
  horaFim = '';
  horarios = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CriarConsulta>,
    private consultaService: ConsultaService,
    private pacienteService: PacienteService,
    private dentistaService: DentistaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.pacienteService.listar().subscribe(lista => this.pacientes = lista);
    this.dentistaService.listar().subscribe(lista => this.dentistas = lista);
  }

  salvar() {
    const inicio = this.montarDataHora(this.dataInicio, this.horaInicio);
    const fim = this.montarDataHora(this.dataFim, this.horaFim);

    if (!this.idPaciente || !this.idDentista || !this.descricao || !inicio || !fim) {
      this.snackBar.open('Preencha todos os campos.', 'Fechar', { duration: 3000 });
      return;
    }

    if (new Date(inicio) < new Date()) {
      this.snackBar.open('Não é possível agendar em uma data passada.', 'Fechar', { duration: 3000 });
      return;
    }

    if (new Date(fim) <= new Date(inicio)) {
      this.snackBar.open('O horário final deve ser depois do inicial.', 'Fechar', { duration: 3000 });
      return;
    }

    const dados = {
      idPaciente: this.idPaciente,
      idDentista: this.idDentista,
      descricao: this.descricao,
      dataInicio: inicio,
      dataFim: fim,
    };

    this.consultaService.criar(dados).subscribe({
      next: () => {
        this.snackBar.open('Consulta criada com sucesso!', 'Fechar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        const msg = err.error?.message || err.error || 'Erro ao criar consulta.';
        this.snackBar.open(msg, 'Fechar', { duration: 4000 });
      }
    });
  }

  private montarDataHora(data: Date | null, hora: string): string | null {
    if (!data || !hora) return null;
    const [h, m] = hora.split(':');
    const d = new Date(data);
    d.setHours(Number(h), Number(m), 0);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}