import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationDisplayComponent } from './components/location-display/location-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LocationDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'bike-thieves-are-jerks';
}
