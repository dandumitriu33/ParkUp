import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParkingSpaceComponent } from './add-parking-space.component';

describe('AddParkingSpaceComponent', () => {
  let component: AddParkingSpaceComponent;
  let fixture: ComponentFixture<AddParkingSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParkingSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParkingSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
