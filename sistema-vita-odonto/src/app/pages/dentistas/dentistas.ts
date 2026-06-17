import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { DentistaService } from '../../services/dentista-service';
import { EditarDentistas } from './editar-dentistas/editar-dentistas';
import { CriarDentistas } from './criar-dentistas/criar-dentistas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dentistas',
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './dentistas.html',
  styleUrl: './dentistas.css',
})
export class Dentistas implements OnInit {

  dentistas: any[] = [];
  dentistasFiltrados: any[] = [];
  nomeBusca = '';

  constructor(private dentistaService: DentistaService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.dentistaService.listar().subscribe(dados => {
      this.dentistas = dados;
      this.dentistasFiltrados = dados;
      this.cdr.detectChanges();
    });
  }

  buscar() {
    this.dentistasFiltrados = this.dentistas.filter(p => p.nome.toLowerCase().includes(this.nomeBusca.toLowerCase()))
  }

  abrirModalEditarD(dentista: any) {
    const ref = this.dialog.open(EditarDentistas, {
      data: dentista
    });

    ref.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.ngOnInit();
      }
    });
  }

  abrirModalCriarD(dentista?: any) {
    const ref = this.dialog.open(CriarDentistas, {
      width: '500px',
      data: dentista ?? null,
    });

    ref.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.ngOnInit();
      }
    });
  }

  desativar(usuario: any) {
    this.dentistaService.desativar(usuario.id).subscribe(() => this.ngOnInit());
  }
}

