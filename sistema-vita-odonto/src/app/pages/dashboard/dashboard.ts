import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { ConsultaService } from '../../services/consulta-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    BaseChartDirective,
    DatePipe],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {

  totalConsultas = 0;
  agendadas = 0;
  finalizadas = 0;
  canceladas = 0;
  taxaCancelamento = 0;
  consultas: any[] = []
  proximasConsultas: any[] = [];
  dadosPorDentista: any = { labels: [], datasets: [] };

  opcoes: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };

  dadosStatus = {
    labels: ['Finalizadas', 'Agendadas', 'Canceladas'],
    datasets: [{
      data: [this.finalizadas, this.agendadas, this.canceladas],
      backgroundColor: ['#1D9E75', '#378ADD', '#E24B4A'],
    }],
  };

  dadosEspecialidade = {
    labels: ['Ortodontia', 'Clínica geral', 'Endodontia', 'Implante', 'Periodontia'],
    datasets: [{
      data: [42, 35, 28, 22, 15],
      backgroundColor: '#378ADD',
    }],
  };

  constructor(private consultaService: ConsultaService) { }


  ngOnInit() {
    // CARDS
    this.consultaService.listar().subscribe(consultas => {
      this.totalConsultas = consultas.length;
      this.agendadas = consultas.filter(c => c.status === 'AGENDADA').length;
      this.finalizadas = consultas.filter(c => c.status === 'FINALIZADA').length;
      const canceladas = consultas.filter(c => c.status === 'CANCELADA').length;
      this.taxaCancelamento = consultas.length
        ? Math.round((canceladas / consultas.length) * 100)
        : 0;
      this.calcularPorDentista(consultas);

      // ROSCA
      this.dadosStatus = {
        labels: ['Finalizadas', 'Agendadas', 'Canceladas'],
        datasets: [{
          data: [this.finalizadas, this.agendadas, canceladas],
          backgroundColor: ['#1D9E75', '#378ADD', '#E24B4A'],
        }],
      };

      // PRÓXIMAS CONSULTAS
      this.proximasConsultas = consultas
        .filter(c => c.status === 'AGENDADA')
        .sort((a, b) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime())
        .slice(0, 5);
    });
  }

  calcularPorDentista(consultas: any[]) {
    const contagem: any = {};
    consultas.forEach(c => {
      contagem[c.nomeDentista] = (contagem[c.nomeDentista] || 0) + 1;
    });

    this.dadosPorDentista = {
      labels: Object.keys(contagem),
      datasets: [{ data: Object.values(contagem), backgroundColor: '#378ADD' }],
    };
  }
}
