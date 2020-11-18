import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosAbiertosComponent } from './avisos-abiertos.component';

describe('AvisosAbiertosComponent', () => {
  let component: AvisosAbiertosComponent;
  let fixture: ComponentFixture<AvisosAbiertosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisosAbiertosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisosAbiertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
