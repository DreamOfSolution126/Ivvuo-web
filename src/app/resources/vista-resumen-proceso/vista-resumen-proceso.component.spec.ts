import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaResumenProcesoComponent } from './vista-resumen-proceso.component';

describe('VistaResumenProcesoComponent', () => {
  let component: VistaResumenProcesoComponent;
  let fixture: ComponentFixture<VistaResumenProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaResumenProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaResumenProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
