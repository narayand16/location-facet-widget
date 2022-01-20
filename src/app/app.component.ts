import { Component } from '@angular/core';
import { MOCK_LOCATIONS } from './mock-data';
import { LocationI } from './models/location.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  widgetTitle = 'Locations';
  searchPlaceholder = 'Filter locations';
  locationList: LocationI[] = [...MOCK_LOCATIONS].sort((a, b) =>
    a.city.localeCompare(b.city)
  );
}
