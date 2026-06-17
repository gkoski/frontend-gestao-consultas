import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EspecialidadeService {
    private apiUrl = `${environment.apiUrl}/especialidades`;

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.get<any[]>(`${this.apiUrl}/listar`);
    }

    buscarPorId(id: number) {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    criar(id: number, dados: any) {
        return this.http.post<any>(`${this.apiUrl}`, dados);
    }
}
