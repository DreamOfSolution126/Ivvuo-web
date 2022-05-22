import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasAdministracionComponent } from './marcas-administracion.component';

describe('MarcasAdministracionComponent', () => {
  let component: MarcasAdministracionComponent;
  let fixture: ComponentFixture<MarcasAdministracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcasAdministracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcasAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
