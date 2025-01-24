import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVoitureAcceuilComponent } from './details-voiture-acceuil.component';

describe('DetailsVoitureAcceuilComponent', () => {
  let component: DetailsVoitureAcceuilComponent;
  let fixture: ComponentFixture<DetailsVoitureAcceuilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsVoitureAcceuilComponent]
    });
    fixture = TestBed.createComponent(DetailsVoitureAcceuilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
