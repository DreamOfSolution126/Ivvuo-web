import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkShopComponent } from './work-shop.component';

describe('WorkShopComponent', () => {
  let component: WorkShopComponent;
  let fixture: ComponentFixture<WorkShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
