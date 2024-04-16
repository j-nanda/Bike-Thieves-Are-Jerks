import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationDisplayComponent } from './components/location-display/location-display.component';
import { SharedDataService } from './services/shared-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LocationDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'bike-thieves-are-jerks';
  lat = ''
  long = ''

  constructor(private sharedDataService : SharedDataService) {}

  ngOnInit() {
    this.sharedDataService.getLat().subscribe(value => {
      this.lat = value;
    });
    this.sharedDataService.getLong().subscribe(value => {
      this.long = value;
    });
  }
}

