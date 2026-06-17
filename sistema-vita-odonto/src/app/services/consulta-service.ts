import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConsultaService {
    private apiUrl = 'http://localhost:8080/consultas';

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.get<any[]>(`${this.apiUrl}/listar`);
    }

    buscarPorId(id: number) {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    criar(dados: any) {
        return this.http.post<any>(`${this.apiUrl}/criar`, dados);
    }

    cancelar(id: number, motivo: string) {
        return this.http.patch<any>(`${this.apiUrl}/${id}/cancelar?motivo=${encodeURIComponent(motivo)}`, {});
    }

    buscarComFiltros(filtros: any) {
        let params = new HttpParams();
        if (filtros.status) params = params.set('status', filtros.status);
        if (filtros.idPaciente) params = params.set('idPaciente', filtros.idPaciente);
        if (filtros.idDentista) params = params.set('idDentista', filtros.idDentista);
        if (filtros.dataInicio) params = params.set('dataInicio', this.toIso(filtros.dataInicio));
        if (filtros.dataFim) params = params.set('dataFim', this.toIso(filtros.dataFim));

        return this.http.get<any[]>(`${this.apiUrl}/relatorios`, { params });
    }

    private toIso(data: Date): string {
        const pad = (n: number) => String(n).padStart(2, '0');
        return `${data.getFullYear()}-${pad(data.getMonth() + 1)}-${pad(data.getDate())}T00:00:00`;
    }
}