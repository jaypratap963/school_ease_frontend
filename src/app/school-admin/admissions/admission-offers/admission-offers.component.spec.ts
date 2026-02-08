import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionOffersComponent } from './admission-offers.component';

describe('AdmissionOffersComponent', () => {
  let component: AdmissionOffersComponent;
  let fixture: ComponentFixture<AdmissionOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmissionOffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
