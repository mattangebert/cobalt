import { TestBed } from '@angular/core/testing';

import { PongOptionService } from './pong-option.service';

describe('PongOptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PongOptionService = TestBed.get(PongOptionService);
    expect(service).toBeTruthy();
  });
});
