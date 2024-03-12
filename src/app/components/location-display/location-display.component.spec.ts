import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDisplayComponent } from './location-display.component';

describe('LocationDisplayComponent', () => {
  let component: LocationDisplayComponent;
  let fixture: ComponentFixture<LocationDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
