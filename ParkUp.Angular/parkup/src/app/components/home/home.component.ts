import { Component, OnInit } from '@angular/core';

import { Area } from '../../models/Area';
import { City } from '../../models/City';
import { ParkingSpace } from '../../models/ParkingSpace';
import { TakenParkingSpace } from '../../models/TakenParkingSpace';
import { AreasService } from '../../services/areas.service';
import { CitiesService } from '../../services/cities.service';
import { ParkingSpacesService } from '../../services/parking-spaces.service';
import { UsersService } from '../../services/users.service';

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
  searchPhrase: string = "";
  searchErrorMessage: string;

  constructor(private citiesService: CitiesService,
              private areasService: AreasService,
              private parkingSpacesService: ParkingSpacesService,
              private usersService: UsersService) { }

  ngOnInit(): void {
    this.citiesService.getAllCities().subscribe({
      next: cities => {
        this.allCities = cities;
      },
      error: err => console.error(err)
    });
    this.populateTakenSpaces();
    this.usersService.isUserLoggedIn.next(true);
  }

  onSearchClick() {
    this.parkingSpacesService.getAllParkingSpacesForArea(this.selectedArea).subscribe({
      next: parkingSpaces => {
        this.availableParkingSpaces = parkingSpaces;
        this.availableParkingSpaces = this.availableParkingSpaces.filter(ps => ps.Name.includes(this.searchPhrase) || ps.StreetName.includes(this.searchPhrase) || ps.Description.includes(this.searchPhrase));
        this.searchErrorMessage = "";
        if (this.availableParkingSpaces.length == 0) {
          this.availableParkingSpaces = parkingSpaces;
          this.searchErrorMessage = `No results for '${this.searchPhrase}'. Displaying all parking spaces.`;
        };
      },
      error: err => console.error(err)
    });
  }

  populateTakenSpaces() {
    if (localStorage.getItem('token') != null) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var currentUserId = payload.UserID;
      this.parkingSpacesService.getTakenParkingSpaces(currentUserId).subscribe({
        next: takenParkingSpaces => {
          this.takenSpaces = takenParkingSpaces;
        },
        error: err => console.error(err)
      });
    }    
  }

  onTakeSpaceClick(parkingSpaceId: number) {
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
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  onLeaveSpaceClick(parkingSpaceId: number) {
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
    this.parkingSpacesService.leaveParkingSpace(takenParkingSpace).subscribe(
      (res: any) => {
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );    
  }

  onCityChange() {
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
    this.availableParkingSpaces = [];
    this.parkingSpacesService.getAllParkingSpacesForArea(this.selectedArea).subscribe({
      next: parkingSpaces => {
        this.availableParkingSpaces = parkingSpaces;
      },
      error: err => console.error(err)
    });
  }

  onSearchNearby() {
    if (navigator.geolocation) {
      this.searchPhrase = "";
      this.selectedCity = "";
      this.selectedArea = "";
      this.availableParkingSpaces = [];
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLatitude = position.coords.latitude.toString();
        this.currentLongitude = position.coords.longitude.toString();
        // leaving this in for demo purposes - some browsers get weird location
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
