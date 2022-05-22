import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarContrasenaClienteComponent } from './recuperar-contrasena-cliente.component';

describe('RecuperarContrasenaClienteComponent', () => {
  let component: RecuperarContrasenaClienteComponent;
  let fixture: ComponentFixture<RecuperarContrasenaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperarContrasenaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarContrasenaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
