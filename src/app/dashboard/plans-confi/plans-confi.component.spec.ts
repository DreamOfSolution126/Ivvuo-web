import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansConfiComponent } from './plans-confi.component';

describe('PlansConfiComponent', () => {
  let component: PlansConfiComponent;
  let fixture: ComponentFixture<PlansConfiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlansConfiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansConfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
