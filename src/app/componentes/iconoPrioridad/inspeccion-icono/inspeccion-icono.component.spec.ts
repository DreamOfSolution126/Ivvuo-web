import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspeccionIconoComponent } from './inspeccion-icono.component';

describe('InspeccionIconoComponent', () => {
  let component: InspeccionIconoComponent;
  let fixture: ComponentFixture<InspeccionIconoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspeccionIconoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspeccionIconoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
