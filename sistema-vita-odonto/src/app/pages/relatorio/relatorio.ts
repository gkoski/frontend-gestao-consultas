import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ConsultaService } from '../../services/consulta-service';
import { PacienteService } from '../../services/paciente-service';
import { DentistaService } from '../../services/dentista-service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-relatorio',
  imports: [MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    NgxMaskDirective
  ],
  templateUrl: './relatorio.html',
  styleUrl: './relatorio.css',
})
export class Relatorio {
  pacientes: any[] = [];
  dentistas: any[] = [];
  consultas: any[] = [];

  filtros = {
    status: '',
    idPaciente: null,
    idDentista: null,
    dataInicio: null as Date | null,
    dataFim: null as Date | null,
  };

  constructor(
    private consultaService: ConsultaService,
    private pacienteService: PacienteService,
    private dentistaService: DentistaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.pacienteService.listar().subscribe(l => { this.pacientes = l; this.cdr.detectChanges(); });
    this.dentistaService.listar().subscribe(l => { this.dentistas = l; this.cdr.detectChanges(); });
  }

  buscar() {
    this.consultaService.buscarComFiltros(this.filtros).subscribe(dados => {
      this.consultas = dados;
      this.cdr.detectChanges();
    });
  }

  limpar() {
    this.filtros = { status: '', idPaciente: null, idDentista: null, dataInicio: null, dataFim: null };
    this.consultas = [];
    this.cdr.detectChanges();
  }
}
