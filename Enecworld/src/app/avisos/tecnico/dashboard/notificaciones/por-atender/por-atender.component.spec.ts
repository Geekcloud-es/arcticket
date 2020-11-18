import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorAtenderComponent } from './por-atender.component';

describe('PorAtenderComponent', () => {
  let component: PorAtenderComponent;
  let fixture: ComponentFixture<PorAtenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorAtenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorAtenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
