import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappConfigComponent } from './whatsapp-config.component';

describe('WhatsappConfigComponent', () => {
  let component: WhatsappConfigComponent;
  let fixture: ComponentFixture<WhatsappConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsappConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
