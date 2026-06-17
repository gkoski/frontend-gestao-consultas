import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { EditarUsuarios } from './editar-usuarios/editar-usuarios';
import { CriarUsuarios } from './criar-usuarios/criar-usuarios';
import { CommonModule } from '@angular/common';
import { ResetarSenha } from './resetar-senha/resetar-senha';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarDialog } from '../../confirmar-dialog/confirmar-dialog';


@Component({
  selector: 'app-usuarios',
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {

  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  nomeBusca = '';

  constructor(private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.usuarioService.listar().subscribe(dados => {
      this.usuarios = dados;
      this.usuariosFiltrados = dados;
      this.cdr.detectChanges();
    });
  }

  buscar() {
    this.usuariosFiltrados = this.usuarios.filter(p => p.nome.toLowerCase().includes(this.nomeBusca.toLowerCase()))
  }

  abrirModalEditarU(usuario: any) {
    const ref = this.dialog.open(EditarUsuarios, {
      data: usuario
    });

    ref.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.ngOnInit();
      }
    });
  }

  abrirModalCriarU(usuario?: any) {
    const ref = this.dialog.open(CriarUsuarios, {
      width: '500px',
      data: usuario ?? null,
    });

    ref.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.ngOnInit();
      }
    });
  }

  resetarSenha(usuario: any) {
    const ref = this.dialog.open(ResetarSenha, {
      width: '400px',
      data: usuario,
    });

    ref.afterClosed().subscribe(resultado => {
      if (resultado) {
      }
    });
  }

  deletar(usuario: any) {
    const ref = this.dialog.open(ConfirmarDialog, {
      width: '400px',
      maxWidth: '90vw',
      data: {
        titulo: 'Excluir usuário',
        mensagem: `Deseja realmente excluir ${usuario.nome}?`
      }
    });

    ref.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.usuarioService.deletar(usuario.id).subscribe({
          next: () => {
            this.snackBar.open('Usuário excluído.', 'Fechar', { duration: 3000 });
            this.ngOnInit();
          },
          error: () => this.snackBar.open('Erro ao excluir.', 'Fechar', { duration: 3000 })
        });
      }
    });
  }
}


