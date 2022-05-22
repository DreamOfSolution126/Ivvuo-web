import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  styleUrls: ['./reporte-general.component.css']
})
export class ReporteGeneralComponent implements OnInit {

  public ordenesCargadas = 50;
  public chartObject: Chart;
  constructor() { }

  @ViewChild('ordenesCargadasChart') OrdenesCargadasChart: ElementRef;


  ngOnInit() {
    this.generateChartOrdenesCargadas();
  }

  generateChartOrdenesCargadas = () => {
    this.chartObject = new Chart( this.OrdenesCargadasChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['a', 'b', 'c', 1,1,12,3,2,1,1,2,3,2],
        datasets : [
          {
            label: 'asdf',
            data: [1, 2, 3,1,3,4,3,2,3,1,2,3,4],
          },
          {
            label: '12',
            data:[2,2,2,2,2,2,2,2,2,2,2,],
            backgroundColor:'red'
          }
        ]
      }
    } );
  }


}
