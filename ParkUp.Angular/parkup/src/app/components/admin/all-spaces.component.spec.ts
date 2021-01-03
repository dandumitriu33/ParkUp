import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSpacesComponent } from './all-spaces.component';

describe('AllSpacesComponent', () => {
  let component: AllSpacesComponent;
  let fixture: ComponentFixture<AllSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSpacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
