import { TestBed } from '@angular/core/testing';

import { Bpo } from './bpo';

describe('Bpo', () => {
  let service: Bpo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bpo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
