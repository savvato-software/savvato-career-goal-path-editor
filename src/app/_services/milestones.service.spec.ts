import { TestBed } from '@angular/core/testing';

import { MilestonesService } from './milestones.service';

describe('MilestonesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MilestonesService = TestBed.get(MilestonesService);
    expect(service).toBeTruthy();
  });
});
