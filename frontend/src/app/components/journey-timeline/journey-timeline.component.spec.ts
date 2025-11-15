import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyTimelineComponent } from './journey-timeline.component';

describe('JourneyTimelineComponent', () => {
  let component: JourneyTimelineComponent;
  let fixture: ComponentFixture<JourneyTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourneyTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JourneyTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
