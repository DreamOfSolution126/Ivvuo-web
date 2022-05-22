import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesCuentaComponent } from './reportes-cuenta.component';

describe('ReportesCuentaComponent', () => {
  let component: ReportesCuentaComponent;
  let fixture: ComponentFixture<ReportesCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
