import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableAdminComponent } from './timetable-admin.component';

describe('TimetableAdminComponent', () => {
  let component: TimetableAdminComponent;
  let fixture: ComponentFixture<TimetableAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimetableAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
