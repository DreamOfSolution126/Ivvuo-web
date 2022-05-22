import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCotizacionActividadComponent } from './formulario-cotizacion-actividad.component';

describe('FormularioCotizacionActvidadComponent', () => {
  let component: FormularioCotizacionActividadComponent;
  let fixture: ComponentFixture<FormularioCotizacionActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioCotizacionActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCotizacionActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
