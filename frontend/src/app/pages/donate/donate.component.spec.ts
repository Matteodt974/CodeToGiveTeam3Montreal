import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateComponent } from './donate.component';

describe('DonateComponent', () => {
  let component: DonateComponent;
  let fixture: ComponentFixture<DonateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default total amount of 100', () => {
    expect(component.totalAmount).toBe(100);
  });

  it('should have at least one cause', () => {
    expect(component.causes.length).toBeGreaterThan(0);
  });

  it('should have total percentage equal to 100', () => {
    const total = component.causes.reduce((sum, c) => sum + c.percentage, 0);
    expect(total).toBe(100);
  });
});
