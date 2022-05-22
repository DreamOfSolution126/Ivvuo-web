import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCentroComponent } from './card-centro.component';

describe('CardCentroComponent', () => {
  let component: CardCentroComponent;
  let fixture: ComponentFixture<CardCentroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCentroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
