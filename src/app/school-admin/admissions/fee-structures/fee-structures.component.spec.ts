import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeStructuresComponent } from './fee-structures.component';

describe('FeeStructuresComponent', () => {
  let component: FeeStructuresComponent;
  let fixture: ComponentFixture<FeeStructuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeStructuresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeStructuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
