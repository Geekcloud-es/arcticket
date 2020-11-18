import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAvisoComponent } from './new-aviso.component';

describe('NewAvisoComponent', () => {
  let component: NewAvisoComponent;
  let fixture: ComponentFixture<NewAvisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAvisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
