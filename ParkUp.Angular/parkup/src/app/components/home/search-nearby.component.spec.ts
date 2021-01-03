import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNearbyComponent } from './search-nearby.component';

describe('SearchNearbyComponent', () => {
  let component: SearchNearbyComponent;
  let fixture: ComponentFixture<SearchNearbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchNearbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNearbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
