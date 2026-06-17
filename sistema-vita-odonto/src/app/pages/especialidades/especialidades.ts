import { ChangeDetectorRef, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { EspecialidadeService } from '../../services/especialidade-service';
import { MatDialog } from '@angular/material/dialog';
import { CriarEspecialidade } from './criar-especialidade/criar-especialidade';

@Component({
  selector: 'app-especialidades',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './especialidades.html',
  styleUrl: './especialidades.css',
})
export class Especialidades {
  especialidades: any[] = [];
  especialidadesFiltradas: any[] = [];
  nomeBusca = '';

  constructor(private especialidadeService: EspecialidadeService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.especialidadeService.listar().subscribe(dados => {
      this.especialidades = dados;
      this.especialidadesFiltradas = dados;
      this.cdr.detectChanges();
    });
  }

  buscar() {
    const termo = this.nomeBusca.toLowerCase();
    this.especialidadesFiltradas = this.especialidades.filter(e =>
      e.nome?.toLowerCase().includes(termo)
    );
    this.cdr.detectChanges();
  }

  abrirModalCriar(especialidade: any) {
    const ref = this.dialog.open(CriarEspecialidade, {
      data: especialidade
    });

    ref.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.ngOnInit();
      }
    });
  }
}

