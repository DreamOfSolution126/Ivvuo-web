import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterSettingComponent } from './center-setting.component';

describe('CenterSettingComponent', () => {
  let component: CenterSettingComponent;
  let fixture: ComponentFixture<CenterSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
