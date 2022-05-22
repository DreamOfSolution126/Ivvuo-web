import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersTeamComponent } from './members-team.component';

describe('MembersTeamComponent', () => {
  let component: MembersTeamComponent;
  let fixture: ComponentFixture<MembersTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
