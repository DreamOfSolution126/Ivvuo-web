import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSmOrdenesComponent } from './listado-sm-ordenes.component';

describe('ListadoSmOrdenesComponent', () => {
  let component: ListadoSmOrdenesComponent;
  let fixture: ComponentFixture<ListadoSmOrdenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoSmOrdenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoSmOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
