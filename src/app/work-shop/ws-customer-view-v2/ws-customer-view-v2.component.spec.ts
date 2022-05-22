import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsCustomerViewV2Component } from './ws-customer-view-v2.component';

describe('WsCustomerViewV2Component', () => {
  let component: WsCustomerViewV2Component;
  let fixture: ComponentFixture<WsCustomerViewV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsCustomerViewV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsCustomerViewV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
