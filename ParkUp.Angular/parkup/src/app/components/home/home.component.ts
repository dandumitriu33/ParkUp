import { Component, OnInit } from '@angular/core';
import { Area } from '../../models/Area';
import { City } from '../../models/City';
import { ParkingSpace } from '../../models/ParkingSpace';
import { TakenParkingSpace } from '../../models/TakenParkingSpace';
import { AreasService } from '../../services/areas.service';
import { CitiesService } from '../../services/cities.service';
import { ParkingSpacesService } from '../../services/parking-spaces.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allCities: City[] = [];
  allAreasForCity: Area[] = [];
  availableParkingSpaces: ParkingSpace[] = [];
  selectedCity: string;
  selectedArea: string;
  currentLatitude: string;
  currentLongitude: string;

  takenSpaces: ParkingSpace[];

  constructor(private citiesService: CitiesService,
              private areasService: AreasService,
              private parkingSpacesService: ParkingSpacesService) { }

  ngOnInit(): void {

    this.citiesService.getAllCities().subscribe({
      next: cities => {
        this.allCities = cities;
      },
      error: err => console.error(err)
    });

    this.populateTakenSpaces();
        
  }

  populateTakenSpaces() {
    console.log(`populating taken spaces`);
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var currentUserId = payload.UserID;
    }
    this.parkingSpacesService.getTakenParkingSpaces(currentUserId).subscribe({
      next: takenParkingSpaces => {
        this.takenSpaces = takenParkingSpaces;
      },
      error: err => console.error(err)
    });
  }

  onTakeSpaceClick(parkingSpaceId: number) {
    console.log(`parking space TAKE clicked for ${parkingSpaceId}`);
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var currentUserId = payload.UserID;
    }
    let placeholderDate: Date = new Date();
    let takenParkingSpace: TakenParkingSpace = {
      "Id": 0,
      "ParkingSpaceId": parkingSpaceId,
      "UserId": currentUserId,
      "DateStarted": placeholderDate
    };
    this.parkingSpacesService.takeParkingSpace(takenParkingSpace).subscribe(
      (res: any) => {
        console.log('PS taken successfully');
      },
      err => {
        console.log(err);
      }
    );
  }

  onCityChange() {
    console.log(`home - selected city changed to: ${this.selectedCity}`);
    // refresh areas based on selectedCity
    this.refreshAreasForSelectedCity(this.selectedCity);
  }

  refreshAreasForSelectedCity(selectedCity: string) {
    this.areasService.getAllAreasForCity(this.selectedCity).subscribe({
      next: areas => {
        this.allAreasForCity = areas;
      },
      error: err => console.error(err)
    });
  }

  onAreaChange() {
    console.log(`home - selected area changed to: ${this.selectedArea}`);
    this.availableParkingSpaces = [];
    // refresh spaces based on Manually selectedArea
    this.parkingSpacesService.getAllParkingSpacesForArea(this.selectedArea).subscribe({
      next: parkingSpaces => {
        this.availableParkingSpaces = parkingSpaces;
      },
      error: err => console.error(err)
    });
  }

  onSearchNearby() {
    console.log('earch nearby clicked');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLatitude = position.coords.latitude.toString();
        this.currentLongitude = position.coords.longitude.toString();

        console.log(`lat: ${this.currentLatitude} - long: ${this.currentLongitude}`);
        this.parkingSpacesService.getNearbyParkingSpaces(this.currentLatitude, this.currentLongitude).subscribe({
          next: parkingSpaces => {
            this.availableParkingSpaces = parkingSpaces;
          },
          error: err => console.error(err)
        });
      });
    } else {
      console.log("No support for geolocation. Please check if browser location checking is allowed.")
    }
    
  }

  userLoggedIn() {
    if (localStorage.getItem('token') != null) {
      return true;
    }
    return false;
  }
  
}
