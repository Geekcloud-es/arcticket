import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewParteComponent } from './new-parte.component';

describe('NewParteComponent', () => {
  let component: NewParteComponent;
  let fixture: ComponentFixture<NewParteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewParteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewParteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
