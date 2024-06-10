import { Component, AfterViewInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar/sidebar.component";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
    selector: 'app-dashboard-visual',
    standalone: true,
    templateUrl: './dashboard-visual.component.html',
    styleUrls: ['./dashboard-visual.component.css'],
    imports: [SidebarComponent]
})
export class DashboardVisualComponent implements AfterViewInit {

    ngAfterViewInit() {
        this.createLineChart();
        this.createPieChart();
    }

    createLineChart() {
        const ctxLine = document.getElementById('lineChart') as HTMLCanvasElement;
        const labels = ['Persona 1', 'Persona 2', 'Persona 3', 'Persona 4', 'Persona 5'];
        const peso = [70, 80, 90, 85, 75];
        const altura = [1.75, 1.80, 1.65, 1.70, 1.78];
        const imc = peso.map((p, i) => parseFloat((p / (altura[i] ** 2)).toFixed(2)));

        new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Peso (kg)',
                        data: peso,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: false
                    },
                    {
                        label: 'Altura (m)',
                        data: altura,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        fill: false
                    },
                    {
                        label: 'IMC',
                        data: imc,
                        borderColor: 'rgba(255, 159, 64, 1)',
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createPieChart() {
        const ctxPie = document.getElementById('pieChart') as HTMLCanvasElement;
        const labels = ['Persona 1', 'Persona 2', 'Persona 3', 'Persona 4', 'Persona 5'];
        const imc = [22.86, 24.69, 33.06, 29.41, 23.67]; // Valores de IMC calculados previamente

        new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'IMC',
                    data: imc,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });
    }
}
