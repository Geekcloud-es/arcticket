import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarParteComponent } from './modificar-parte.component';

describe('ModificarParteComponent', () => {
  let component: ModificarParteComponent;
  let fixture: ComponentFixture<ModificarParteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarParteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarParteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
