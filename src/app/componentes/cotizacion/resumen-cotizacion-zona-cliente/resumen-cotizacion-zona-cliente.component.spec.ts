import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCotizacionZonaClienteComponent } from './resumen-cotizacion-zona-cliente.component';

describe('ResumenCotizacionZonaClienteComponent', () => {
  let component: ResumenCotizacionZonaClienteComponent;
  let fixture: ComponentFixture<ResumenCotizacionZonaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenCotizacionZonaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenCotizacionZonaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
