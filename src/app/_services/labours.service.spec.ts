import { TestBed } from '@angular/core/testing';

import { LaboursService } from './labours.service';

describe('LaboursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaboursService = TestBed.get(LaboursService);
    expect(service).toBeTruthy();
  });
});
