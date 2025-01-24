import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReservationClientComponent } from './edit-reservation-client.component';

describe('EditReservationClientComponent', () => {
  let component: EditReservationClientComponent;
  let fixture: ComponentFixture<EditReservationClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditReservationClientComponent]
    });
    fixture = TestBed.createComponent(EditReservationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
