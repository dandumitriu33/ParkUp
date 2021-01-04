import { TestBed } from '@angular/core/testing';

import { ParkingSpacesService } from './parking-spaces.service';

describe('ParkingSpacesService', () => {
  let service: ParkingSpacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingSpacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
