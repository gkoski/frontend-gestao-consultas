import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../services/paciente-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditarPaciente } from './editar-paciente/editar-paciente';
import { ChangeDetectorRef } from '@angular/core';
import { CriarPacientes } from './criar-pacientes/criar-pacientes';


@Component({
  selector: 'app-pacientes',
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css',
})
export class Pacientes implements OnInit {

  pacientes: any[] = [];
  pacientesFiltrados: any[] = [];
  nomeBusca = '';

  constructor(private pacienteService: PacienteService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.pacienteService.listar().subscribe(dados => {
      this.pacientes = dados;
      this.pacientesFiltrados = dados;
      this.cdr.detectChanges();
    });
  }

  buscar() {
    this.pacientesFiltrados = this.pacientes.filter(p => p.nome.toLowerCase().includes(this.nomeBusca.toLowerCase()))
  }

  abrirModalEditarP(paciente: any) {
    const ref = this.dialog.open(EditarPaciente, {
      data: paciente
    });

    ref.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.ngOnInit();
      }
    });
  }

  abrirModalCriarP(paciente?: any) {
    const ref = this.dialog.open(CriarPacientes, {
      width: '500px',
      data: paciente ?? null,
    });

    ref.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.ngOnInit();
      }
    });
  }
}
