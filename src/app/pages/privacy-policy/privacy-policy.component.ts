import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  public lenguajeSelect:string = 'es'
  public policyPrivacy = [
    {
      lenguaje:'es',
      title:'Política de Privacidad',
      resume:'IVVUO S.A.S le agradece su acceso o uso de este sitio web. IVVUO S.A.S desea asegurarle que respeta la confidencialidad de sus datos, sabemos que la confianza es la clave de toda relación comercial exitosa. La siguiente Política de privacidad describe el compromiso de IVVUO S.A.S para proteger sus datos personales. Este política de privacidad da a entender como IVVUO S.A.S usa y divulga sus datos personales o comerciales, esta policita se aplica solo a este sitio, también explica los pasos que IVVUO S.A.S ha tomado para asegurar la seguridad de sus datos personales. Por último, esta Política explica sus opciones sobre la recopilación, el uso y la divulgación de sus datos personales. Es importante indicarle que IVVUO S.A.S no se responsabiliza por las prácticas de confidencialidad de ningún sitio que no sea IVVUO S.A.S y al cual este sitio tenga enlaces.',
      content:[
        {
          subtitle:'RECOPILACIÓN Y USO DE LA INFORMACIÓN',
          paragraph:[
            {
              index:0,
              p:'IVVUO S.A.S puede recopilar información sobre usted en varios puntos diferentes y de diferentes maneras en este sitio. IVVUO S.A.S le pedirá su autorización antes de recopilar cualquier información que lo identifique personalmente o que permita que IVVUO S.A.S se comunique con usted.'
            },
            {
              index:1,
              p:'Efectuará las gestiones pertinentes para el desarrollo del objeto social de la compañía en lo que tiene que ver con el cumplimiento del objeto del contrato celebrado con el Titular de la información.'
            },
            {
              index:2,
              p:'Realizará invitaciones a eventos y ofrecer nuevos productos y servicios.'
            },
            {
              index:3,
              p:'Gestionará trámites (solicitudes, quejas, reclamos).'
            },
            {
              index:4,
              p:'Efectuará encuestas de satisfacción respecto de los bienes y servicios ofrecidos por IVVUO S.A.S.'
            },
            {
              index:4,
              p:'Suministrará información de contacto a la fuerza comercial y/o red de distribución, telemercadeo, investigación de mercados y cualquier tercero con el cual IVVUO SAS tenga un vínculo contractual para el desarrollo de actividades de ese tipo para la ejecución de las mismas.'
            },
            {
              index:5,
              p:'Contactará al Titular a través de medios telefónicos para realizar encuestas, estudios y/o confirmación de datos personales necesarios para la ejecución de una relación contractual.'
            },
            {
              index:6,
              p:'Contactará al Titular a través de medios electrónicos – SMS o chat para el envío de noticias relacionadas con campañas de fidelización o mejora de servicio.'
            },
            {
              index:7,
              p:'Contactará al Titular a través de correo electrónico para el envío de extractos, estados de cuenta o facturas en relación con las obligaciones derivadas del contrato celebrado entre las partes.'
            },
            {
              index:8,
              p:'Transmitirá los datos personales fuera del país a terceros con los cuales IVVUO S.A.S haya suscrito un contrato de procesamiento de datos y sea necesario entregársela para el cumplimiento del objeto contractual.'
            },
            {
              index:9,
              p:'Garantizar el cumplimiento de las condiciones recogidas en el Aviso Legal y en la ley aplicable. Esto puede incluir el desarrollo de herramientas y algoritmos que ayuden a este sitio Web a garantizar la confidencialidad de los datos personales que recoge.'
            },
            {
              index:10,
              p:'Apoyar y mejorar los servicios que ofrece este sitio Web.'
            },
            {
              index:11,
              p:'Gestionar las redes sociales, IVVUO S.A.S tiene presencia en redes sociales. Si se hace seguidor en las redes sociales del Titular el tratamiento de los datos personales se regirá por este apartado, así como por aquellas condiciones de uso, políticas de privacidad y normativas de acceso que pertenezcan a la red social que proceda en cada caso y que has aceptado previamente.'
            },
            {
              index:12,
              p:'IVVUO S.A.S tratará sus datos personales con la finalidad de administrar correctamente su presencia en la red social, informarte de sus actividades, productos o servicios, así como para cualquier otra finalidad que las normativas de las redes sociales permitan.'
            },
            {
              index:13,
              p:'En ningún caso IVVUO S.A.S utilizará los perfiles de seguidores en redes sociales para enviar publicidad de manera individual.'
            }
          ]
        },
        {
          subtitle:'USO Y DIVULGACION DE LA INFORMACION',
          paragraph:[
            {
              p:'Uso interno. IVVUO S.A.S puede identificarlo a usted con respecto al uso de ciertos aspectos de este sitio para proporcionarle información sobre productos o promociones relacionadas. '
            },
            {
              p:'IVVUO S.A.S puede usar internamente sus datos personales para mejorar la gestión de marketing y promociones, para mejorar el contenido o la presentación del contenido del sitio, y para determinar información general de mercado sobre los visitantes de este sitio.'
            },
            {
              p:'Uso externo. IVVUO S.A.S no vende, alquila, licencia o divulga de ninguna otra manera sus datos personales específicos a terceros. IVVUO S.A.S solo puede divulgar sus datos personales en virtud de una orden válida del gobierno o de un tribunal, o en virtud de ciertas transacciones empresariales, como una fusión, una adquisición o una reorganización.'
            }
          ]
        },
        {
          subtitle:'SEGURIDAD DE LOS DATOS',
          paragraph:[
            {
              p:'El sitio incorpora varios procedimientos físicos, electrónicos y administrativos para salvaguardar la confidencialidad de sus datos personales. El acceso a sus datos personales es restringido. '
            },
            {
              p:'Sólo a los trabajadores que necesitan acceder a sus datos personales para realizar un trabajo específico se les permite el acceso a los mismos. Por último, los servidores donde IVVUO S.A.S almacena sus datos personales se mantienen en un ambiente seguro, el sitio Web está alojado en DONGEE Y LA BASE DE DATOS HEROKU MONGOLABS. La seguridad de tus datos está garantizada, ya que toman todas las medidas de seguridad necesarias para ello. '
            },
            {
              p:'SI BIEN IVVUO S.A.S TOMÓ TODA PRECAUCIÓN COMERCIALMENTE RAZONABLE PARA SALVAGUARDAR SUS DATOS PERSONALES, NO PUEDE GARANTIZAR UNA SEGURIDAD TOTAL PORQUE EN INTERNET NO EXISTE ACTUALMENTE LA SEGURIDAD TOTAL.'
            }
          ]
        },
        {
          subtitle:'OPCIÓN PARA RETIRARSE / CORRECCIONES',
          paragraph:[
            {
              p:'Si usted  solicita que IVVUO S.A.S retirare sus datos personales de la base de datos procederemos a cancelar su suscripción a este sitio o a una porción del mismo, o corregiremos o actualizaremos sus datos personales.'
            },
            {
              p:'Puede solicitar que IVVUO S.A.S retire, corrija o actualice sus datos personales en la sección "Contáctanos" de este sitio.'
            }
          ]
        },
        {
          subtitle:'ACTUALIZACIONES A ESTA POLÍTICA',
          paragraph:[
            {
              p:'Si IVVUO S.A.S decide modificar o actualizar esta Política de privacidad, publicará las modificaciones o actualizaciones en este sitio para que usted siempre sepa qué información de IVVUO S.A.S se recopila, usa y distribuye, puede acceder a nuestra Política de Tratamiento de información, la cual se encuentra publicada en  https://ivvuo.com/#/politicadeprivacidad'
            }
          ]
        }
      ]
    },
    {
      lenguaje:'en',
      title:'PRIVACY POLICIES',
      resume:`IVVUO S.A.S thanks you for your access or use of this website. IVVUO S.A.S wishes to assure you that it respects the confidentiality of your data, we know that trust is the key to any successful business relationship. The following Privacy Policy describes the commitment of IVVUO S.A.S to protect your personal data. 
      This privacy officer implies how IVVUO S.A.S uses and discloses your personal or commercial data, this police officer applies only to this site, it also explains the steps that IVVUO S.A.S has taken to ensure the security of your personal data. Finally, this Policy explains your options on the collection, use and disclosure of your personal data. 
      It is important to indicate that IVVUO S.A.S is not responsible for the confidentiality practices of any site other than IVVUO S.A.S and to which this site has links.
      `,
      content:[
        {
          subtitle:'COLLECTION AND USE OF INFORMATION',
          paragraph:[
            {
              index:0,
              p:'IVVUO S.A.S may collect information about you at several different points and in different ways on this site. IVVUO S.A.S will ask for your authorization before collecting any personally identifiable information or that allows IVVUO S.A.S to contact you.'
            },
            {
              index:1,
              p:`Carry out the pertinent steps for the development of the company's corporate purpose in relation to the fulfillment of the object of the contract concluded with the Holder of the information.`,
            },
            {
              index:2,
              p:'Make invitations to events and offer new products and services.'
            },
            {
              index:3,
              p:'Manage procedures (applications, complaints, claims)'
            },
            {
              index:4,
              p:'Conduct satisfaction surveys regarding the goods and services offered by IVVUO S.A.S'
            },
            {
              index:5,
              p:'Provide contact information to the commercial force and / or distribution network, telemarketing, market research and any third party with which IVVUO SAS has a contractual link for the development of such activities for the execution thereof'
            },
            {
              index:6,
              p:'Contact the Holder through telephone means to conduct surveys, studies and / or confirmation of personal data necessary for the execution of a contractual relationship.'
            },
            {
              index:7,
              p:'Contact the Holder through electronic means - SMS or chat to send news related to loyalty campaigns or service improvement.'
            },
            {
              index:8,
              p:'Contact the Holder through email to send extracts, statements or invoices in relation to the obligations arising from the contract between the parties.'
            },
            {
              index:9,
              p:'It will transmit the personal data outside the country to third parties with which IVVUO S.A.S has signed a data processing contract and it is necessary to deliver it for the fulfillment of the contractual object.'
            },
            {
              index:10,
              p:'Guarantee compliance with the conditions set forth in the Legal Notice and in the applicable law. This may include the development of tools and algorithms that help this website to guarantee the confidentiality of the personal data it collects.'
            },
            {
              index:11,
              p:'Support and improve the services offered by this website.'
            },
            {
              index:12,
              p:`Manage social networks, IVVUO S.A.S has a presence in social networks. If you become a follower in the Holder's social networks, the processing of personal data will be governed by this section, as well as by those conditions of use, privacy policies and access regulations that belong to the social network that corresponds in each case and that You have previously accepted.`
            },
            {
              index:13,
              p:'IVVUO S.A.S will process your personal data in order to correctly manage your presence on the social network, inform you of your activities, products or services, as well as for any other purpose that the regulations of social networks allow.'
            },
            {
              index:14,
              p:'In no case IVVUO S.A.S will use the profiles of followers in social networks to send advertising individually.'
            }
          ]
        },
        {
          subtitle:'USE AND DISCLOSURE OF INFORMATION',
          paragraph:[
            {
              p:'Internal use. IVVUO S.A.S may identify you with respect to the use of certain aspects of this site to provide you with information about related products or promotions.'
            },
            {
              p:'IVVUO S.A.S may use your personal data internally to improve marketing and promotions management, to improve the content or presentation of the site content, and to determine general market information about visitors to this site.'
            },
            {
              p:'External use. IVVUO S.A.S does not sell, rent, license or otherwise disclose your specific personal data to third parties. IVVUO S.A.S may only disclose your personal data by virtue of a valid government or court order, or by virtue of certain business transactions, such as a merger, acquisition or reorganization.'
            }
          ]
        },
        {
          subtitle:'DATA SECURITY',
          paragraph:[
            {
              p:'The site incorporates several physical, electronic and administrative procedures to safeguard the confidentiality of your personal data. Access to your personal data is restricted.'
            },
            {
              p:'Only workers who need access to their personal data to perform a specific job are allowed access to them. Finally, the servers where IVVUO S.A.S stores your personal data are kept in a secure environment, the website is hosted on DONGEE AND THE HEROKU MONGOLABS DATABASE. The security of your data is guaranteed, since they take all the necessary security measures for it.'
            },
            {
              p:'IF IVVUO S.A.S WAS TAKING ALL COMMERCIALLY REASONABLE PRECAUTIONS TO SAFEGUARD ITS PERSONAL DATA, WE DO NOT GUARANTEE THAT IT WILL NEVER BE PRODUCED WITHOUT AUTHORIZED ACCESS'
            }
          ]
        },
        {
          subtitle:'OPTION TO REMOVE / CORRECTIONS ',
          paragraph:[
            {
              p:'If you request that IVVUO S.A.S withdraw your personal data from the database we will proceed to cancel your subscription to this site or to a portion thereof, or we will correct or update your personal data. You can request that IVVUO S.A.S remove, correct or update your personal data in the "Contact Us" section of this site. UPDATES TO THIS POLICY If IVVUO SAS decides to modify or update this Privacy Policy, it will publish the modifications or updates on this site so that you always know what information from IVVUO SAS is collected, used and distributed, you can access our Information Processing Policy, which is published in https://ivvuo.com/#/politicadeprivacidad'
            }
          ]
        },
        {
          subtitle:'ACTUALIZACIONES A ESTA POLÍTICA',
          paragraph:[
            {
              p:'Si IVVUO S.A.S decide modificar o actualizar esta Política de privacidad, publicará las modificaciones o actualizaciones en este sitio para que usted siempre sepa qué información de IVVUO S.A.S se recopila, usa y distribuye, puede acceder a nuestra Política de Tratamiento de información, la cual se encuentra publicada en  https://ivvuo.com/#/politicadeprivacidad'
            }
          ]
        }
      ]
    },
  ]
  public policySelect = { title:'', resume:'', content:[] }
  constructor( private titleService:Title) { }

  ngOnInit() {
    this.selectLenguaje();
    
  }

  selectLenguaje(){
    this.policyPrivacy.map( (e) => {
      if(e.lenguaje == this.lenguajeSelect){
        this.policySelect = e;
        this.titleService.setTitle( `IVVUO :: ${this.policySelect.title}` )
      }
    } )
  }

}
