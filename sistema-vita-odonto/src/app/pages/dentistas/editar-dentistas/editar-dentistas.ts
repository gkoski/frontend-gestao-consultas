import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DentistaService } from '../../../services/dentista-service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-editar-dentistas',
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, NgxMaskDirective],
  templateUrl: './editar-dentistas.html',
  styleUrl: './editar-dentistas.css'
})
export class EditarDentistas {

  nome: string;
  cpf: string;
  email: string;
  cro: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditarDentistas>,
    private dentistaService: DentistaService
  ) {
    this.nome = data.nome;
    this.cpf = data.cpf;
    this.email = data.email;
    this.cro = data.cro;
  }

  salvar() {
    const dados = {
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      cro: this.cro
    };

    this.dentistaService.editar(this.data.id, dados).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}