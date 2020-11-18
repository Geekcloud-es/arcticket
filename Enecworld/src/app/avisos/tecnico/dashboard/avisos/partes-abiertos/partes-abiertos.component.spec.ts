import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartesAbiertosComponent } from './partes-abiertos.component';

describe('PartesAbiertosComponent', () => {
  let component: PartesAbiertosComponent;
  let fixture: ComponentFixture<PartesAbiertosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartesAbiertosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartesAbiertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
