import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCuentaComponent } from './formulario-cuenta.component';

describe('FormularioCuentaComponent', () => {
  let component: FormularioCuentaComponent;
  let fixture: ComponentFixture<FormularioCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
