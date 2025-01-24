import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPasswordClientComponent } from './edit-password-client.component';

describe('EditPasswordClientComponent', () => {
  let component: EditPasswordClientComponent;
  let fixture: ComponentFixture<EditPasswordClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPasswordClientComponent]
    });
    fixture = TestBed.createComponent(EditPasswordClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
