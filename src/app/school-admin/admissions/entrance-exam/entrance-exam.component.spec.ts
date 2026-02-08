import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceExamComponent } from './entrance-exam.component';

describe('EntranceExamComponent', () => {
  let component: EntranceExamComponent;
  let fixture: ComponentFixture<EntranceExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntranceExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntranceExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
