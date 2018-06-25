import { TestBed, inject } from '@angular/core/testing';

import { HovereffectService } from './hovereffect.service';

describe('HovereffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HovereffectService]
    });
  });

  it('should be created', inject([HovereffectService], (service: HovereffectService) => {
    expect(service).toBeTruthy();
  }));
});
