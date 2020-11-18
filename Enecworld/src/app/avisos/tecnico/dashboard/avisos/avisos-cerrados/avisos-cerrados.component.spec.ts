import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosCerradosComponent } from './avisos-cerrados.component';

describe('AvisosCerradosComponent', () => {
  let component: AvisosCerradosComponent;
  let fixture: ComponentFixture<AvisosCerradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisosCerradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisosCerradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
