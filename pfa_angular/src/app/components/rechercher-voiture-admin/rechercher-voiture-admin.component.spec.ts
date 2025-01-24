import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercherVoitureAdminComponent } from './rechercher-voiture-admin.component';

describe('RechercherVoitureAdminComponent', () => {
  let component: RechercherVoitureAdminComponent;
  let fixture: ComponentFixture<RechercherVoitureAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechercherVoitureAdminComponent]
    });
    fixture = TestBed.createComponent(RechercherVoitureAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
