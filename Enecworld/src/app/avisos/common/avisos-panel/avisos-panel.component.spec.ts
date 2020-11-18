import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosPanelComponent } from './avisos-panel.component';

describe('AvisosPanelComponent', () => {
  let component: AvisosPanelComponent;
  let fixture: ComponentFixture<AvisosPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisosPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisosPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
