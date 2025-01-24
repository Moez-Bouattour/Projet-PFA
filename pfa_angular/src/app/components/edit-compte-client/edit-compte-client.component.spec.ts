import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompteClientComponent } from './edit-compte-client.component';

describe('EditCompteClientComponent', () => {
  let component: EditCompteClientComponent;
  let fixture: ComponentFixture<EditCompteClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCompteClientComponent]
    });
    fixture = TestBed.createComponent(EditCompteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
