import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor() { }

  getAllCities() {
    return [{
      "Id": 3,
      "Name": "Bucharest",
      "Areas": []
    },
      {
        "Id": 4,
        "Name": "London",
        "Areas": []
      },
      {
        "Id": 5,
        "Name": "Paris",
        "Areas": []
      }]
  }

}
