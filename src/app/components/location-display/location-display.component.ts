import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-location-display',
  templateUrl: './location-display.component.html',
  styleUrls: ['./location-display.component.scss'],
  imports: [CommonModule],
})
export class LocationDisplayComponent implements OnInit {
  locationData: any;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getLatestLocation().subscribe(
      (data) => {
        this.locationData = JSON.parse(data.data);
        console.log('recieved success');
        console.log(data);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }
}
