import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualColeComponent } from './visual-cole.component';

describe('VisualColeComponent', () => {
  let component: VisualColeComponent;
  let fixture: ComponentFixture<VisualColeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualColeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualColeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
