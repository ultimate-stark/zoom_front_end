import { TestBed } from '@angular/core/testing';

import { NotUserService } from './not-user.service';

describe('NotUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotUserService = TestBed.get(NotUserService);
    expect(service).toBeTruthy();
  });
});
