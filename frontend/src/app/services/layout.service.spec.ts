import { TestBed } from '@angular/core/testing';

import { FactoryLayoutManager } from './layout.service';

describe('Layout', () => {
  let service: FactoryLayoutManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactoryLayoutManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
