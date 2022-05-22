import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioMarcaComponent } from './formulario-marca.component';

describe('FormularioMarcaComponent', () => {
  let component: FormularioMarcaComponent;
  let fixture: ComponentFixture<FormularioMarcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioMarcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
