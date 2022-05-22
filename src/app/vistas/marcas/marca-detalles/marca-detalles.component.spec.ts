import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaDetallesComponent } from './marca-detalles.component';

describe('MarcaDetallesComponent', () => {
  let component: MarcaDetallesComponent;
  let fixture: ComponentFixture<MarcaDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcaDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
