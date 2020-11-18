import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosClientesComponent } from './datos-clientes.component';

describe('DatosClientesComponent', () => {
  let component: DatosClientesComponent;
  let fixture: ComponentFixture<DatosClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
