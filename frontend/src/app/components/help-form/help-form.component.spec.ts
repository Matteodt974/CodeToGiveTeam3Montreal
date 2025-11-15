import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpFormComponent } from './help-form.component';

describe('HelpFormComponent', () => {
  let component: HelpFormComponent;
  let fixture: ComponentFixture<HelpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
