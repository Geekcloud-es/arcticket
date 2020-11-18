import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarAvisoComponent } from './cerrar-aviso.component';

describe('CerrarAvisoComponent', () => {
  let component: CerrarAvisoComponent;
  let fixture: ComponentFixture<CerrarAvisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerrarAvisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerrarAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
