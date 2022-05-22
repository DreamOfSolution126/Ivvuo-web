import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsCustomerViewComponent } from './ws-customer-view.component';

describe('WsCustomerViewComponent', () => {
  let component: WsCustomerViewComponent;
  let fixture: ComponentFixture<WsCustomerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsCustomerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsCustomerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
