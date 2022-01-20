import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { LocationFacetComponent } from './location-facet.component';

describe('LocationFacetComponent', () => {
  let component: LocationFacetComponent;
  let fixture: ComponentFixture<LocationFacetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationFacetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationFacetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store search query value', () => {
    component.searchQuery = '';
    component.onSearchQuery(of('testSearch'));
    expect(component.searchQuery).toEqual('testSearch');
  });

  it('should set checkbox to checked for given location', () => {
    component.checkBoxCheckedCount = 0;
    component.onCheckboxChecked({ city: 'Pune', country: 'India' });
    expect(component.checkBoxCheckedCount).toEqual(1);
  });

  it('should clear checked checkboxes and set count as 0', () => {
    component.locationsList = [
      { city: 'Pune', country: 'India', isChecked: true },
    ];
    component.checkBoxCheckedCount = 1;
    component.onClearAllClick();
    expect(component.locationsList[0].isChecked).toEqual(false);
    expect(component.checkBoxCheckedCount).toEqual(0);
  });

  it('should select checkboxes and set count', () => {
    component.locationsList = [
      { city: 'Pune', country: 'India', isChecked: false },
    ];
    component.checkBoxCheckedCount = 1;
    component.onSelectAllClick();
    expect(component.locationsList[0].isChecked).toBeTruthy();
    expect(component.checkBoxCheckedCount).toEqual(1);
  });

  it('get element visibility', () => {
    const ref = {
      nativeElement: {
        style: {
          visibility: 'hidden',
        },
      },
    };
    const result = component.getElementVisibility(ref);
    expect(result).toEqual('hidden');
  });
});
