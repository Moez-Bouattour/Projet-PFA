import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVoitureComponent } from './search-voiture.component';

describe('SearchVoitureComponent', () => {
  let component: SearchVoitureComponent;
  let fixture: ComponentFixture<SearchVoitureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchVoitureComponent]
    });
    fixture = TestBed.createComponent(SearchVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
