import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterAccountComponent } from './center-account.component';

describe('CenterAccountComponent', () => {
  let component: CenterAccountComponent;
  let fixture: ComponentFixture<CenterAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
