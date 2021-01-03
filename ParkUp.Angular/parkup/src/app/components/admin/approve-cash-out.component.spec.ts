import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCashOutComponent } from './approve-cash-out.component';

describe('ApproveCashOutComponent', () => {
  let component: ApproveCashOutComponent;
  let fixture: ComponentFixture<ApproveCashOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveCashOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCashOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
