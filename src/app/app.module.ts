import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { FilterPipe } from '../app/pipes/filter.pipe';
import { LocationFacetComponent } from './components/location-facet/location-facet.component';
import { ScrollableDirective } from './directives/scrollable.directive';
import { OffsetTopDirective } from './directives/offset-top.directive';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FilterPipe,
    LocationFacetComponent,
    ScrollableDirective,
    OffsetTopDirective,
  ],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
