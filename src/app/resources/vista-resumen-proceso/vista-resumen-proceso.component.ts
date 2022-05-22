import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vista-resumen-proceso',
  templateUrl: './vista-resumen-proceso.component.html',
  styleUrls: ['./vista-resumen-proceso.component.css']
})
export class VistaResumenProcesoComponent implements OnInit {

  public procesos = [
    {
      'key': true,
      'id': 'customProcess',
      'listid': '5e850d65574daa02f28fe5e1',
      'account_code': 'AC001',
      'icon': '<i class="fas fa-thumbtack"></i>',
      'name': 'Diagnóstico',
      'description': 'Solicitudes del cliente',
      'weight': 100,
      'index': 0,
      'notifyCustomer': true,
      'advanceValue': 100,
      'checkList': [
        {
          'item': 'Nueva solicitud del cliente',
          'id': 'Wed Apr 15 2020 21:10:06 GMT-0500 (hora estándar de Colombia)',
          'details': 'Solicitud del cliente',
          'asnwer_options': [
            {
              'value': 2,
              'answer': 'Ok'
            },
            {
              'value': 1,
              'answer': 'Regular'
            },
            {
              'value': 0,
              'answer': 'Urgente'
            },
            {
              'value': 99,
              'answer': 'N/A'
            }
          ],
          'answer': {
            'value': 1,
            'answer': 'Regular'
          },
          'attach': [
            {
              'url': 'http://localhost:3001/uploads/nueva solicitud del cliente-1587003486106.jpg',
              'type': 'jpg',
              'name': 'FB_IMG_1545857597463.jpg',
              'date': 1587003486118
            },
            {
              'url': 'http://localhost:3001/attach/nueva solicitud del cliente-1587003561494.jpg',
              'type': 'jpg',
              'name': 'FB_IMG_1546353560119.jpg',
              'date': 1587003561508
            },
            {
              'url': 'http://localhost:3001/attach/nueva solicitud del cliente-1587003577778.jpg',
              'type': 'jpg',
              'name': 'FB_IMG_1546959866139.jpg',
              'date': 1587003577804
            }
          ],
          'comments': [
            {
              'text': 'Mas comentarios',
              'date': '2020-04-16T02:20:46.496Z',
              'user': 'centro@mail.com'
            },
            {
              'text': 'Los comentarios se pueden eliminar',
              'date': '2020-04-16T02:20:38.606Z',
              'user': 'centro@mail.com'
            },
            {
              'text': 'Ma de un comentario',
              'date': '2020-04-16T02:20:20.386Z',
              'user': 'centro@mail.com'
            }
          ],
          'parts': 5,
          'mo': 9,
          'total': 14,
          'approved': '',
          'listId': '',
          'processId': 'customProcess',
          'account_code': '',
          'weight': 100,
          'type': 'inspection',
          'quotation': {
            'parts': [
              {
                'code': '1',
                'name': '1',
                'units': 1,
                'valueUnit': 1,
                'total': 1,
                'customerAnswer': {
                  'status': '',
                  'date': ''
                }
              },
              {
                'code': '2',
                'name': '2',
                'units': 2,
                'valueUnit': 2,
                'total': 4,
                'customerAnswer': {
                  'status': '',
                  'date': ''
                }
              }
            ],
            'mo': [
              {
                'routine': '3',
                'hours': 3,
                'valueHour': 3,
                'total': 9
              }
            ]
          },
          'resQuotation': [],
          'seeCustomer': true,
          'index': 0
        },
        {
          'item': 'Otra solicitud',
          'id': 'Wed Apr 15 2020 21:10:14 GMT-0500 (hora estándar de Colombia)',
          'details': 'Solicitud del cliente',
          'asnwer_options': [
            {
              'value': 2,
              'answer': 'Ok'
            },
            {
              'value': 1,
              'answer': 'Regular'
            },
            {
              'value': 0,
              'answer': 'Urgente'
            },
            {
              'value': 99,
              'answer': 'N/A'
            }
          ],
          'answer': {
            'value': 0,
            'answer': 'Urgente'
          },
          'attach': [],
          'comments': [],
          'parts': 10000,
          'mo': 0,
          'total': 10000,
          'approved': '',
          'listId': '',
          'processId': 'customProcess',
          'account_code': '',
          'weight': 100,
          'type': 'inspection',
          'quotation': {
            'parts': [
              {
                'code': '1',
                'name': '1',
                'units': 1,
                'valueUnit': 10000,
                'total': 10000,
                'customerAnswer': {
                  'status': '',
                  'date': ''
                }
              }
            ],
            'mo': []
          },
          'resQuotation': [],
          'seeCustomer': true,
          'index': 0
        },
        {
          'item': 'Una test',
          'id': 'Wed Apr 22 2020 21:23:10 GMT-0500 (hora estándar de Colombia)',
          'details': 'Solicitud del cliente',
          'asnwer_options': [
            {
              'value': 2,
              'answer': 'Ok'
            },
            {
              'value': 1,
              'answer': 'Regular'
            },
            {
              'value': 0,
              'answer': 'Urgente'
            },
            {
              'value': 99,
              'answer': 'N/A'
            }
          ],
          'answer': {
            'value': 1,
            'answer': 'Regular'
          },
          'attach': [],
          'comments': [],
          'parts': 10000,
          'mo': 0,
          'total': 10000,
          'approved': '',
          'listId': '',
          'processId': 'customProcess',
          'account_code': '',
          'weight': 100,
          'type': 'inspection',
          'quotation': {
            'parts': [
              {
                'code': '1',
                'name': '',
                'units': 1,
                'valueUnit': 10000,
                'total': 10000,
                'customerAnswer': {
                  'status': '',
                  'date': ''
                }
              }
            ],
            'mo': []
          },
          'resQuotation': [],
          'seeCustomer': true,
          'index': 0
        },
        {
          'item': 'Nueva solicitud',
          'id': 'Thu Apr 23 2020 13:24:16 GMT-0500 (hora estándar de Colombia)',
          'details': 'Solicitud del cliente',
          'asnwer_options': [
            {
              'value': 2,
              'answer': 'Ok'
            },
            {
              'value': 1,
              'answer': 'Regular'
            },
            {
              'value': 0,
              'answer': 'Urgente'
            },
            {
              'value': 99,
              'answer': 'N/A'
            }
          ],
          'answer': {
            'value': 2,
            'answer': 'Ok'
          },
          'attach': [],
          'comments': [],
          'parts': 0,
          'mo': 0,
          'total': 0,
          'approved': '',
          'listId': '',
          'processId': 'customProcess',
          'account_code': '',
          'weight': 100,
          'type': 'inspection',
          'quotation': {
            'parts': [],
            'mo': []
          },
          'resQuotation': [],
          'seeCustomer': true,
          'index': 0
        },
        {
          'item': 'Nueva solicitud',
          'id': 'Thu Apr 23 2020 13:24:23 GMT-0500 (hora estándar de Colombia)',
          'details': 'Solicitud del cliente',
          'asnwer_options': [
            {
              'value': 2,
              'answer': 'Ok'
            },
            {
              'value': 1,
              'answer': 'Regular'
            },
            {
              'value': 0,
              'answer': 'Urgente'
            },
            {
              'value': 99,
              'answer': 'N/A'
            }
          ],
          'answer': {
            'value': 2,
            'answer': 'Ok'
          },
          'attach': [],
          'comments': [],
          'parts': 0,
          'mo': 0,
          'total': 0,
          'approved': '',
          'listId': '',
          'processId': 'customProcess',
          'account_code': '',
          'weight': 100,
          'type': 'inspection',
          'quotation': {
            'parts': [],
            'mo': []
          },
          'resQuotation': [],
          'seeCustomer': true,
          'index': 0
        }
      ],
      'seeProcess': true
    },
    {
      'id': '5e850d99574daa02f28fe5e2',
      'name': 'Recepción',
      'icon': '<i class="fas fa-hands"></i>',
      'description': 'Verifique el estado de los componentes',
      'weight': null,
      'notifyCustomer': false,
      'index': 1,
      'advanceValue': 100,
      'checkList': [
        {
          'id': '5e850dd1574daa02f28fe5e3',
          'processId': '5e850d99574daa02f28fe5e2',
          'account_code': 'AC001',
          'item': 'Inspección visual',
          'details': 'Realice una inspección visual de los componentes',
          'weight': null,
          'type': 'inspection',
          'parts': 0,
          'mo': 0,
          'total': 0,
          'index': 0,
          'seeCustomer': true,
          'quotation': {
            'mo': [],
            'parts': []
          },
          'asnwer_options': [
            {
              'answer': 'Ok',
              'value': 2
            },
            {
              'answer': 'Regular',
              'value': 1
            },
            {
              'answer': 'Urgente',
              'value': 0
            },
            {
              'answer': 'N/A',
              'value': 99
            }
          ],
          'resQuotation': {
            'status': '',
            'date': '',
            'block': false
          },
          'answer': {
            'answer': 'Ok',
            'value': 2
          },
          'attach': [],
          'comments': []
        },
        {
          'id': '5e850e02574daa02f28fe5e4',
          'processId': '5e850d99574daa02f28fe5e2',
          'account_code': 'AC001',
          'item': 'Integridad de estructura',
          'details': 'Verifique la estructura',
          'weight': null,
          'type': 'check',
          'parts': 0,
          'mo': 0,
          'total': 0,
          'index': 1,
          'seeCustomer': true,
          'quotation': {
            'mo': [],
            'parts': []
          },
          'asnwer_options': [
            {
              'answer': 'Cumple',
              'value': 2
            },
            {
              'answer': 'No cumple',
              'value': 0
            },
            {
              'answer': 'N/A',
              'value': 99
            }
          ],
          'resQuotation': {
            'status': '',
            'date': '',
            'block': false
          },
          'answer': {
            'answer': 'Cumple',
            'value': 2
          },
          'attach': [],
          'comments': []
        },
        {
          'id': '5e850e3c574daa02f28fe5e5',
          'processId': '5e850d99574daa02f28fe5e2',
          'account_code': 'AC001',
          'item': 'Cumple con los documentos',
          'details': 'Verifique que cumple con la totalidad de los documentos',
          'weight': null,
          'type': 'check',
          'parts': 0,
          'mo': 0,
          'total': 0,
          'index': 2,
          'seeCustomer': true,
          'quotation': {
            'parts': [
              {
                'total': 0,
                'valueUnit': '',
                'units': 1,
                'name': '123123',
                'code': '1212'
              }
            ],
            'mo': []
          },
          'asnwer_options': [
            {
              'value': 2,
              'answer': 'Cumple'
            },
            {
              'value': 0,
              'answer': 'No cumple'
            },
            {
              'value': 99,
              'answer': 'N/A'
            }
          ],
          'resQuotation': {
            'status': '',
            'date': '',
            'block': false
          },
          'answer': {
            'value': 2,
            'answer': 'Cumple'
          },
          'attach': [],
          'comments': []
        }
      ],
      'seeProcess': true
    },
    {
      'id': '5e850e6e574daa02f28fe5e6',
      'name': 'Inicio de los trabajos',
      'icon': '<i class="fas fa-warehouse"></i>',
      'description': 'Inician los trabajos de reparación',
      'weight': null,
      'notifyCustomer': false,
      'index': 2,
      'advanceValue': 100,
      'checkList': [
        {
          'id': '5e86614ac9f5321409b54dde',
          'processId': '5e850e6e574daa02f28fe5e6',
          'account_code': 'AC001',
          'item': 'opcion personalizada',
          'details': 'detalles. de la opcion',
          'weight': null,
          'type': 'custom',
          'parts': 0,
          'mo': 0,
          'total': 0,
          'index': 0,
          'seeCustomer': true,
          'quotation': {
            'mo': [],
            'parts': []
          },
          'asnwer_options': [
            {
              'style': 'text-success',
              'answer': 'op1 ',
              'value': 2
            },
            {
              'style': 'text-warning',
              'answer': 'op 2',
              'value': 1
            },
            {
              'style': 'text-danger',
              'answer': 'op 3',
              'value': 0
            }
          ],
          'resQuotation': {
            'status': '',
            'date': '',
            'block': false
          },
          'answer': {
            'style': 'text-success',
            'answer': 'op1 ',
            'value': 2
          },
          'attach': [],
          'comments': []
        },
        {
          'id': '5e850f3d574daa02f28fe5e8',
          'processId': '5e850e6e574daa02f28fe5e6',
          'account_code': 'AC001',
          'item': 'Reemplazar guardas',
          'details': 'Item con cotización predefinida',
          'weight': null,
          'type': 'inspection',
          'parts': 56700,
          'mo': 28100,
          'total': 0,
          'index': 1,
          'seeCustomer': true,
          'quotation': {
            'parts': [
              {
                'seeDetails': true,
                'total': 26900,
                'valueUnit': 13450,
                'units': 2,
                'name': 'GUARDA LAT 2',
                'code': 'G33234'
              },
              {
                'total': 29800,
                'valueUnit': 14900,
                'units': 2,
                'name': 'GUARDA LAT 4',
                'code': 'G33235'
              }
            ],
            'mo': [
              {
                'total': 25600,
                'valueHour': 12800,
                'hours': 2,
                'routine': 'INSTALACION GUARDAS'
              },
              {
                'total': 2500,
                'valueHour': 2500,
                'hours': 1,
                'routine': 'REACONDICIONAMIENTO'
              }
            ]
          },
          'asnwer_options': [
            {
              'value': 2,
              'answer': 'Ok'
            },
            {
              'value': 1,
              'answer': 'Regular'
            },
            {
              'value': 0,
              'answer': 'Urgente'
            },
            {
              'value': 99,
              'answer': 'N/A'
            }
          ],
          'resQuotation': {
            'status': '',
            'date': '',
            'block': false
          },
          'answer': {
            'value': 2,
            'answer': 'Ok'
          },
          'attach': [],
          'comments': []
        },
        {
          'id': '5e850ea9574daa02f28fe5e7',
          'processId': '5e850e6e574daa02f28fe5e6',
          'account_code': 'AC001',
          'item': 'Reemplazar empaques',
          'details': 'Esta actividad tiene componentes de precio predefinidos',
          'weight': null,
          'type': 'inspection',
          'parts': 100000,
          'mo': 23400,
          'total': 123400,
          'index': 3,
          'seeCustomer': true,
          'quotation': {
            'parts': [
              {
                'total': 100000,
                'valueUnit': 25000,
                'units': 4,
                'name': 'EMPAQUES 3"',
                'code': '882938'
              }
            ],
            'mo': [
              {
                'total': 23400,
                'valueHour': 23400,
                'hours': 1,
                'routine': 'CAMBIO DE EMPAQUES'
              }
            ]
          },
          'asnwer_options': [
            {
              'value': 2,
              'answer': 'Ok'
            },
            {
              'value': 1,
              'answer': 'Regular'
            },
            {
              'value': 0,
              'answer': 'Urgente'
            },
            {
              'value': 99,
              'answer': 'N/A'
            }
          ],
          'resQuotation': {
            'status': 'approved',
            'date': '2020-04-16T02:15:25.325Z',
            'block': true
          },
          'answer': {
            'value': 0,
            'answer': 'Urgente'
          },
          'attach': [],
          'comments': [],
          'seeOther': true
        }
      ],
      'seeProcess': true
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
