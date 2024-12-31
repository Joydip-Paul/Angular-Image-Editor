import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorLandingComponent } from './editor-landing.component';

describe('EditorLandingComponent', () => {
  let component: EditorLandingComponent;
  let fixture: ComponentFixture<EditorLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorLandingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditorLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
