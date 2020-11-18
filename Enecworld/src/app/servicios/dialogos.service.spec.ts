import { TestBed } from '@angular/core/testing';

import { DialogosService } from './dialogos.service';

describe('DialogosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogosService = TestBed.get(DialogosService);
    expect(service).toBeTruthy();
  });
});
