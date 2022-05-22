import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOrdenesClienteComponent } from './item-ordenes-cliente.component';

describe('ItemOrdenesClienteComponent', () => {
  let component: ItemOrdenesClienteComponent;
  let fixture: ComponentFixture<ItemOrdenesClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemOrdenesClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOrdenesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
