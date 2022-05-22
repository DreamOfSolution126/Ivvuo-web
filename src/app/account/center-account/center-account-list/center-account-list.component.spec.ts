import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterAccountListComponent } from './center-account-list.component';

describe('CenterAccountListComponent', () => {
  let component: CenterAccountListComponent;
  let fixture: ComponentFixture<CenterAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
