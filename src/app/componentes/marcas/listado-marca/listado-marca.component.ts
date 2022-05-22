import { Component, OnInit, Input } from '@angular/core';
import { IMarca } from '../../../interfaces/marca/marca';
import { CountryService } from '../../../services/countrys/country.service';

@Component({
  selector: 'app-listado-marca',
  templateUrl: './listado-marca.component.html',
  styleUrls: ['./listado-marca.component.css']
})
export class ListadoMarcaComponent implements OnInit {

  @Input() marcas: IMarca[];
  public listadoPaises = [];
  constructor(
    private paisesService: CountryService
  ) { }

  ngOnInit() {
    this.consultaPaises();
  }

  consultaPaises = () => {
    this.listadoPaises = this.paisesService.getCountrys();
  }

}
