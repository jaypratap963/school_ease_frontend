import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableTeacherComponent } from './timetable-teacher.component';

describe('TimetableTeacherComponent', () => {
  let component: TimetableTeacherComponent;
  let fixture: ComponentFixture<TimetableTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimetableTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
