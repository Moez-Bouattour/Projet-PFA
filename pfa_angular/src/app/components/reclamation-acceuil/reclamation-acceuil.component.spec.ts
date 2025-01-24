import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationAcceuilComponent } from './reclamation-acceuil.component';

describe('ReclamationAcceuilComponent', () => {
  let component: ReclamationAcceuilComponent;
  let fixture: ComponentFixture<ReclamationAcceuilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReclamationAcceuilComponent]
    });
    fixture = TestBed.createComponent(ReclamationAcceuilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
