import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeePaymentsComponent } from './fee-payments.component';

describe('FeePaymentsComponent', () => {
  let component: FeePaymentsComponent;
  let fixture: ComponentFixture<FeePaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeePaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
