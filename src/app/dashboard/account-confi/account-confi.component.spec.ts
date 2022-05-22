import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountConfiComponent } from './account-confi.component';

describe('AccountConfiComponent', () => {
  let component: AccountConfiComponent;
  let fixture: ComponentFixture<AccountConfiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountConfiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountConfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
