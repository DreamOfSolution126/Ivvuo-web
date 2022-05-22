import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralClienteComponent } from './general-cliente.component';

describe('GeneralClienteComponent', () => {
  let component: GeneralClienteComponent;
  let fixture: ComponentFixture<GeneralClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
