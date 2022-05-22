import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMarcaComponent } from './listado-marca.component';

describe('ListadoMarcaComponent', () => {
  let component: ListadoMarcaComponent;
  let fixture: ComponentFixture<ListadoMarcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoMarcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
