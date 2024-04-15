import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualCursComponent } from './visual-curs.component';

describe('VisualCursComponent', () => {
  let component: VisualCursComponent;
  let fixture: ComponentFixture<VisualCursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualCursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualCursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
