import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() searchQuery: EventEmitter<Observable<string>> = new EventEmitter<
    Observable<string>
  >();
  @Input() searchPlaceholder: string = 'Filter';

  onSearch($event: any): void {
    this.searchQuery.emit(of($event.target.value));
  }
}
