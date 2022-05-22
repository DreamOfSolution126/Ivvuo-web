import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSesionClienteComponent } from './inicio-sesion-cliente.component';

describe('InicioSesionClienteComponent', () => {
  let component: InicioSesionClienteComponent;
  let fixture: ComponentFixture<InicioSesionClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioSesionClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioSesionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
