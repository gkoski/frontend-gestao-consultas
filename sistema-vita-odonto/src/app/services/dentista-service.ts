import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DentistaService {
    private apiUrl = `${environment.apiUrl}/dentistas`;

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

    desativar(id: number) {
        return this.http.patch(`${this.apiUrl}/${id}/desativar`, {});
    }
}
