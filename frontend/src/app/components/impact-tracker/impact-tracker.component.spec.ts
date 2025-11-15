import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactTrackerComponent } from './impact-tracker.component';

describe('ImpactTrackerComponent', () => {
  let component: ImpactTrackerComponent;
  let fixture: ComponentFixture<ImpactTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpactTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpactTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
