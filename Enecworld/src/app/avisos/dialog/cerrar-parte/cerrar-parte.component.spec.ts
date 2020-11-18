import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarParteComponent } from './cerrar-parte.component';

describe('CerrarParteComponent', () => {
  let component: CerrarParteComponent;
  let fixture: ComponentFixture<CerrarParteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerrarParteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerrarParteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
