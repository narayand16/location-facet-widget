import { Pipe, PipeTransform } from '@angular/core';
import { LocationI } from '../models/location.interface';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(locationsList: LocationI[], filterText: string): LocationI[] {
    if (!locationsList) {
      return [];
    }
    if (!filterText) {
      return locationsList;
    }

    return locationsList.filter(
      (element) =>
        element.city.toLowerCase().includes(filterText.toLowerCase().trim()) ||
        element.country.toLowerCase().includes(filterText.toLowerCase().trim())
    );
  }
}
