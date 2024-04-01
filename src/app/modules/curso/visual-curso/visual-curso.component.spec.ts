import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualCursoComponent } from './visual-curso.component';

describe('VisualCursoComponent', () => {
  let component: VisualCursoComponent;
  let fixture: ComponentFixture<VisualCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
