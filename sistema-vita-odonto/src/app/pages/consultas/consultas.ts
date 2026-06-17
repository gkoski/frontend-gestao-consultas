import { ChangeDetectorRef, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConsultaService } from '../../services/consulta-service';
import { CriarConsulta } from './criar-consulta/criar-consulta';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CancelarConsulta } from './cancelar-consulta/cancelar-consulta';


@Component({
  selector: 'app-consultas',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './consultas.html',
  styleUrl: './consultas.css',
})
export class Consultas {
  consultas: any[] = [];
  consultasFiltradas: any[] = [];
  nomeBusca = '';


  constructor(private consultaService: ConsultaService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.consultaService.listar().subscribe(dados => {
      this.consultas = dados;
      this.consultasFiltradas = dados;
      this.cdr.detectChanges();
    });
  }

  buscar() {
    console.log('buscar chamado, termo:', this.nomeBusca);
    const termo = this.nomeBusca.toLowerCase();
    this.consultasFiltradas = this.consultas.filter(c =>
      c.nomePaciente?.toLowerCase().includes(termo) ||
      c.nomeDentista.toLowerCase().includes(termo)
    );
    console.log('resultado:', this.consultasFiltradas);
    this.cdr.detectChanges();
  }

  abrirModalCriar(consulta: any) {
    const ref = this.dialog.open(CriarConsulta, {
      data: consulta
    });

    ref.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.ngOnInit();
      }
    });
  }

  abrirCancelamento(consulta: any) {
    const ref = this.dialog.open(CancelarConsulta, {
      width: '400px',
      data: consulta,
    });

    ref.afterClosed().subscribe(motivo => {
      if (motivo) {
        this.consultaService.cancelar(consulta.id, motivo).subscribe({
          next: () => {
            this.snackBar.open('Consulta cancelada.', 'Fechar', { duration: 3000 });
            this.ngOnInit();
          },
          error: () => this.snackBar.open('Erro ao cancelar.', 'Fechar', { duration: 3000 })
        });
      }
    });
  }
}

