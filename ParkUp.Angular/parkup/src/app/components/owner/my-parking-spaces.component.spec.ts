import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyParkingSpacesComponent } from './my-parking-spaces.component';

describe('MyParkingSpacesComponent', () => {
  let component: MyParkingSpacesComponent;
  let fixture: ComponentFixture<MyParkingSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyParkingSpacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyParkingSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
