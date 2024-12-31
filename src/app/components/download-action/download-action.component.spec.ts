import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadActionComponent } from './download-action.component';

describe('DownloadActionComponent', () => {
  let component: DownloadActionComponent;
  let fixture: ComponentFixture<DownloadActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
