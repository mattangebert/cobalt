import { TestBed } from '@angular/core/testing';

import { OptionControlService } from './option-control.service';

describe('OptionControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OptionControlService = TestBed.get(OptionControlService);
    expect(service).toBeTruthy();
  });
});
