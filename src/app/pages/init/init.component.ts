import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  public data = [
    {
      title:'Seguimiento a reparación',
      content:'Revise el avance de cada uno de los trabajos y haga requerimientos de servicio',
      img:'../../../assets/img/card/1.png',
      themes:[
        'Control Proceso'
      ]
    },
    {
      title:'Canal de comunicación',
      content:'Envíe el reporte de servicio y el avance de la reparación a través de SMS y e-mail a sus clientes, con la opción de aprobar sus presupuestos en línea',
      img:'../../../assets/img/card/3.png',
      themes:[
        'SMS',
        'E-Mail',
        'Aprobación en Linea'
      ]
    },
    {
      title:'Información del cliente',
      content:'Consolide un base de datos de sus clientes, vehículos y características',
      img:'../../../assets/img/card/2.png',
      themes:[
        'Cliente',
        'Relacionamiento',
        'Digital'
      ]
    },
    {
      title:'Personalice sus Listas de chequeo',
      content:'Cada lista de chequeo puede ser configurada en sus puntos y en sus observaciones o respuestas. De igual manera personalice sus SMS y sus e-mail.',
      img:'../../../assets/img/card/6.png',
      themes:[
        'Control Proceso',
        'Personalización',
        'Adaptabilidad'
      ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
