import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  standalone: true,
  selector: 'app-location-display',
  templateUrl: './location-display.component.html',
  styleUrls: ['./location-display.component.scss'],
  imports: [CommonModule],
})
export class LocationDisplayComponent implements OnInit {
  locationData: any;

  constructor(private locationService: LocationService,
              private sharedDataService: SharedDataService) {}

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
    this.sharedDataService.setLat('40.7128');
    this.sharedDataService.setLong('-74.0060');
  }
}
