import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercherVoitureClientComponent } from './rechercher-voiture-client.component';

describe('RechercherVoitureClientComponent', () => {
  let component: RechercherVoitureClientComponent;
  let fixture: ComponentFixture<RechercherVoitureClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechercherVoitureClientComponent]
    });
    fixture = TestBed.createComponent(RechercherVoitureClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
