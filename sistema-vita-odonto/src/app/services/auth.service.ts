import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:8080/auth';

    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, senha: string) {
        return this.http.post(`${this.apiUrl}/login`, { email, senha }, { responseType: 'text' });
    }

    salvarToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    isLoggedIn() {
        return !!this.getToken();
    }

    getPerfil(): string | null {
        const token = this.getToken();
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.perfil;
        } catch {
            return null;
        }
    }

    isAdmin(): boolean {
        return this.getPerfil() === 'ADMIN';
    }

    getEmail(): string | null {
        const token = this.getToken();
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.sub;
        } catch {
            return null;
        }
    }
}