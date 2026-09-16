import { TestBed } from '@angular/core/testing';

import { MachineRenderService } from './machine-render.service';

describe('MachineRender', () => {
  let service: MachineRenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachineRenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
