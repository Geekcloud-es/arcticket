import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAvisoComponent } from './modificar-aviso.component';

describe('ModificarAvisoComponent', () => {
  let component: ModificarAvisoComponent;
  let fixture: ComponentFixture<ModificarAvisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarAvisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
