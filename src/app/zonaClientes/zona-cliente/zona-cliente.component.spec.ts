import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaClienteComponent } from './zona-cliente.component';

describe('ZonaClienteComponent', () => {
  let component: ZonaClienteComponent;
  let fixture: ComponentFixture<ZonaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
