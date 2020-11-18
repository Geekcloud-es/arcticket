import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonoHorasComponent } from './bono-horas.component';

describe('BonoHorasComponent', () => {
  let component: BonoHorasComponent;
  let fixture: ComponentFixture<BonoHorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonoHorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonoHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
