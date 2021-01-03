import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveSpacesComponent } from './approve-spaces.component';

describe('ApproveSpacesComponent', () => {
  let component: ApproveSpacesComponent;
  let fixture: ComponentFixture<ApproveSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveSpacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
