import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitureAdminComponent } from './voiture-admin.component';

describe('VoitureAdminComponent', () => {
  let component: VoitureAdminComponent;
  let fixture: ComponentFixture<VoitureAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoitureAdminComponent]
    });
    fixture = TestBed.createComponent(VoitureAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
