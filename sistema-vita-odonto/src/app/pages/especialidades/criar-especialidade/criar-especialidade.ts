import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EspecialidadeService } from '../../../services/especialidade-service';

@Component({
  selector: 'app-criar-especialidade',
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './criar-especialidade.html',
  styleUrl: './criar-especialidade.css'
})
export class CriarEspecialidade {

  nome: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CriarEspecialidade>,
    private especialidadeService: EspecialidadeService
  ) {
    this.nome = data.nome;

  }

  criar() {
    const dados = {
      nome: this.nome
    };

    this.especialidadeService.criar(this.data.id, dados).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  salvar() {
    const dados = {
      nome: this.nome
    };

    this.especialidadeService.criar(this.data.id, dados).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}