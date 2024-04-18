import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  NgZone,
} from '@angular/core';
import { LocationService } from '../../services/location.service';
import { CommonModule } from '@angular/common';

declare global {
  interface Window {
    initMap: () => void;
  }
}
declare var google: any;

@Component({
  standalone: true,
  selector: 'app-location-display',
  templateUrl: './location-display.component.html',
  styleUrls: ['./location-display.component.scss'],
  imports: [CommonModule],
})
export class LocationDisplayComponent implements OnInit {
  locationData: any;
  cityState: string = '';
  lastUpdated: string = '';
  map: any; // Store map instance
  marker: any; // Store marker instance
  accuracyCircle: any; // Store accuracy circle instance
  locationSubscription: any;

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  constructor(
    private locationService: LocationService,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.locationSubscription = this.locationService
      .getLatestLocation()
      .subscribe(
        (data) => {
          this.lastUpdated = new Date().toLocaleString(); // Update timestamp
          this.locationData = JSON.parse(data.data);

          if (!this.map) {
            this.loadGoogleMaps();
          } else {
            this.updateMap();
          }
        },
        (error) => {
          console.error('There was an error!', error);
        }
      );
    this.loadGoogleMaps();
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }
  }

  loadGoogleMaps(): void {
    if (!document.querySelector('[src*="googleapis.com"]')) {
      const script = this.renderer.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDiU1dbll2mmsqlxH8I3P9_f5ROdgqDFcc&callback=initMap';
      script.async = true;
      script.defer = true;
      this.renderer.appendChild(document.head, script);

      window.initMap = () => this.initMap();
    }
  }

  initMap(): void {
    this.updateMap();
  }

  updateMap(): void {
    const location = new google.maps.LatLng(
      this.locationData.lat,
      this.locationData.lon
    );
    // Update map settings
    if (!this.map) {
      const mapOptions = {
        zoom: 16,
        center: location,
      };
      this.map = new google.maps.Map(
        this.mapContainer.nativeElement,
        mapOptions
      );
    } else {
      this.map.setCenter(location);
    }

    // Update or create marker
    if (this.marker) {
      this.marker.setPosition(location);
    } else {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Your Location',
      });
    }

    // Update or create accuracy circle
    if (this.accuracyCircle) {
      this.accuracyCircle.setCenter(location);
      this.accuracyCircle.setRadius(this.locationData.accuracy);
    } else {
      this.accuracyCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this.map,
        center: location,
        radius: this.locationData.accuracy * 3,
      });
    }

    this.geocodeLocation(location);
  }

  geocodeLocation(location: google.maps.LatLng): void {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { location: location },
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus
      ) => {
        if (status === 'OK' && results[0]) {
          const addressComponents = results[0].address_components;
          const city = addressComponents.find(
            (c: google.maps.GeocoderAddressComponent) =>
              c.types.includes('locality')
          )?.long_name;
          const state = addressComponents.find(
            (c: google.maps.GeocoderAddressComponent) =>
              c.types.includes('administrative_area_level_1')
          )?.long_name;
          this.ngZone.run(() => {
            this.cityState = `${city}, ${state}`;
          });
        }
      }
    );
  }
}
