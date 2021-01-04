import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../../services/cities/cities.service';

@Component({
  selector: 'app-all-cities',
  templateUrl: './all-cities.component.html',
  styleUrls: ['./all-cities.component.css']
})
export class AllCitiesComponent implements OnInit {
  allCities: any[];

  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.allCities = this.citiesService.getAllCities();
  }

}
