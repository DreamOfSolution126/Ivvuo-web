import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsDashboardComponent } from './ws-dashboard.component';

describe('WsDashboardComponent', () => {
  let component: WsDashboardComponent;
  let fixture: ComponentFixture<WsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
