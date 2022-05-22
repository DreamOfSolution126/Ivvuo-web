import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsClienteDetallesComponent } from './ws-cliente-detalles.component';

describe('WsClienteDetallesComponent', () => {
  let component: WsClienteDetallesComponent;
  let fixture: ComponentFixture<WsClienteDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsClienteDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsClienteDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
