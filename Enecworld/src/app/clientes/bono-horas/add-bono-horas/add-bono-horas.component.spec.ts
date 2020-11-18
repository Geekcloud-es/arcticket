import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBonoHorasComponent } from './add-bono-horas.component';

describe('AddBonoHorasComponent', () => {
  let component: AddBonoHorasComponent;
  let fixture: ComponentFixture<AddBonoHorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBonoHorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBonoHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
