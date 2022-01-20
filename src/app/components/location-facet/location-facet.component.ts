import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LocationI } from '../../models/location.interface';

@Component({
  selector: 'app-location-facet',
  templateUrl: './location-facet.component.html',
  styleUrls: ['./location-facet.component.scss'],
})
export class LocationFacetComponent implements OnChanges {
  @Input() title = '';
  @Input() searchPlaceholder = '';
  @Input('locations') locationsList: LocationI[] = [];
  @Input() isShowMinimizeBtn = true;
  @Input() isShowCollapseBtn = true;
  @ViewChild('listRef', { static: true }) listRef: ElementRef;
  @ViewChild('mainContainer', { static: true }) mainContainer: ElementRef;

  searchQuery = '';
  chars: string[] = [];
  selectedItem: number = 0;
  minimized = false;
  isCollapsed = false;
  checkBoxCheckedCount = 0;
  disableCollapseBtn = false;
  disableMinimizeBtn = false;

  ngOnChanges(): void {
    this.chars = [
      ...new Set(this.locationsList.map((element) => element.city.charAt(0))),
    ];
  }

  onSearchQuery(searchText: Observable<string>): void {
    searchText
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchText) => {
        this.searchQuery = searchText;
      });
  }

  onCheckboxChecked(location: LocationI) {
    console.log(location);
    if (location.isChecked) {
      location.isChecked = !location.isChecked;
      this.checkBoxCheckedCount--;
    } else {
      location['isChecked'] = true;
      this.checkBoxCheckedCount++;
    }
  }

  onClearAllClick(): void {
    this.locationsList = this.locationsList.map((location) => {
      return { ...location, isChecked: false };
    });
    this.checkBoxCheckedCount = 0;
  }

  onSelectAllClick(): void {
    this.locationsList = this.locationsList.map((location) => {
      return { ...location, isChecked: true };
    });
    this.checkBoxCheckedCount = this.locationsList.length;
  }

  toggleContainer(dimension: string): void {
    switch (dimension) {
      case 'height':
        {
          this.minimized = !this.minimized;
          this.disableCollapseBtn = !this.disableCollapseBtn;
          if (this.getElementVisibility(this.listRef) === 'hidden') {
            this.setStyleOnElementRef(this.listRef, {
              visibility: 'visible',
              height: '100%',
            });
          } else {
            this.setStyleOnElementRef(this.listRef, {
              visibility: 'hidden',
              height: '0',
            });
          }
        }
        break;
      case 'width': {
        this.isCollapsed = !this.isCollapsed;
        this.disableMinimizeBtn = !this.disableMinimizeBtn;
        if (this.getElementVisibility(this.listRef) === 'hidden') {
          const obj = {
            transform: `rotate(0deg)`,
            position: 'static',
            top: '0',
          };
          this.setStyleOnElementRef(this.listRef, {
            visibility: 'visible',
            height: '100%',
          });
          this.setStyleOnElementRef(this.mainContainer, obj);
        } else {
          const obj = {
            transform: `rotate(270deg)`,
            position: 'relative',
            top: '10rem',
          };
          this.setStyleOnElementRef(this.listRef, {
            visibility: 'hidden',
            height: '0',
          });
          this.setStyleOnElementRef(this.mainContainer, obj);
        }
      }
    }
  }

  getElementVisibility(elementRef: ElementRef): string {
    return elementRef && elementRef.nativeElement.style.visibility;
  }

  setStyleOnElementRef(elementRef: ElementRef, styleObject: any): void {
    for (const key in styleObject) {
      elementRef.nativeElement.style[key] = styleObject[key];
    }
  }

  onCharacterClick(character: string): void {
    const index = this.locationsList.findIndex((element) =>
      element.city.startsWith(character)
    );
    const element = document.getElementById(
      this.locationsList[index].city + '_' + index
    );
    element?.scrollIntoView({ behavior: 'smooth' });
  }
}
