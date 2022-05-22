import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoOrdenesZonaClienteComponent } from './listado-ordenes-zona-cliente.component';

describe('ListadoOrdenesZonaClienteComponent', () => {
  let component: ListadoOrdenesZonaClienteComponent;
  let fixture: ComponentFixture<ListadoOrdenesZonaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoOrdenesZonaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoOrdenesZonaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
