import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentersConfiComponent } from './centers-confi.component';

describe('CentersConfiComponent', () => {
  let component: CentersConfiComponent;
  let fixture: ComponentFixture<CentersConfiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentersConfiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentersConfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
