import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlayoutsComponent } from './adminlayouts.component';

describe('AdminlayoutsComponent', () => {
  let component: AdminlayoutsComponent;
  let fixture: ComponentFixture<AdminlayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminlayoutsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminlayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
