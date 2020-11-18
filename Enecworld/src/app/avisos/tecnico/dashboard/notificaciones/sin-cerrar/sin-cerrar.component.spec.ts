import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinCerrarComponent } from './sin-cerrar.component';

describe('SinCerrarComponent', () => {
  let component: SinCerrarComponent;
  let fixture: ComponentFixture<SinCerrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinCerrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinCerrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
