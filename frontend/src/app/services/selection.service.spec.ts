import { TestBed } from '@angular/core/testing';

import { Selection } from './selection.service';

describe('Selection', () => {
  let service: Selection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Selection);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
