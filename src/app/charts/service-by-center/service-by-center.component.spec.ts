import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceByCenterComponent } from './service-by-center.component';

describe('ServiceByCenterComponent', () => {
  let component: ServiceByCenterComponent;
  let fixture: ComponentFixture<ServiceByCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceByCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceByCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
