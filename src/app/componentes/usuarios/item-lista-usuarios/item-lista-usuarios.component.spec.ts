import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListaUsuariosComponent } from './item-lista-usuarios.component';

describe('ItemListaUsuariosComponent', () => {
  let component: ItemListaUsuariosComponent;
  let fixture: ComponentFixture<ItemListaUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemListaUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
