import { OptionService } from './option.service';
import { TestBed } from '@angular/core/testing';


describe('OptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OptionService = TestBed.get(OptionService);
    expect(service).toBeTruthy();
  });
});

