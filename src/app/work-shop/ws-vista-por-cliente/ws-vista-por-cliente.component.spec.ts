import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsVistaPorClienteComponent } from './ws-vista-por-cliente.component';

describe('WsVistaPorClienteComponent', () => {
  let component: WsVistaPorClienteComponent;
  let fixture: ComponentFixture<WsVistaPorClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsVistaPorClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsVistaPorClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
