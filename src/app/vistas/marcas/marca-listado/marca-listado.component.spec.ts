import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaListadoComponent } from './marca-listado.component';

describe('MarcaListadoComponent', () => {
  let component: MarcaListadoComponent;
  let fixture: ComponentFixture<MarcaListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcaListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
