import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsOrderDetailsComponent } from './ws-order-details.component';

describe('WsOrderDetailsComponent', () => {
  let component: WsOrderDetailsComponent;
  let fixture: ComponentFixture<WsOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
