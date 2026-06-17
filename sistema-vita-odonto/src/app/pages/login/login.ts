import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-login',
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatButtonToggleModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  senha = '';

  private authService = inject(AuthService);

  private router = inject(Router);

  login() {
    this.authService.login(this.email, this.senha).subscribe({
      next: (token) => {
        this.authService.salvarToken(token);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        alert('Email ou senha incorretos!');
      }
    });
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }

}
