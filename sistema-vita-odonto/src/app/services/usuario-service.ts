import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
    private apiUrl = 'http://localhost:8080/usuarios';

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.get<any[]>(`${this.apiUrl}/listar`);
    }

    buscarPorId(id: number) {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    editar(id: number, dados: any) {
        return this.http.put<any>(`${this.apiUrl}/${id}`, dados);
    }

    criar(dados: any) {
        return this.http.post(`${this.apiUrl}`, dados);
    }

    resetarSenha(id: number, senha: string) {
        return this.http.put(`${this.apiUrl}/${id}/resetar-senha`, { senha });
    }

    deletar(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
