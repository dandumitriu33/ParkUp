import { Component, OnInit } from '@angular/core';

import { Area } from '../../models/Area';
import { AreasService } from '../../services/areas.service';

@Component({
  selector: 'app-all-areas',
  templateUrl: './all-areas.component.html',
  styleUrls: ['./all-areas.component.css']
})
export class AllAreasComponent implements OnInit {
  allAreasForCity: Area[];

  _cityIdSelect: string;
  get cityIdSelect(): string {
    return this._cityIdSelect;
  }
  set cityIdSelect(value: string) {
    this._cityIdSelect = value;
  }

  constructor(private areasService:AreasService) { }

  ngOnInit(): void {
    
  }

  refreshAreasForCity(cityId: string) {
    this.areasService.getAllAreasForCity(cityId).subscribe({
      next: areas => {
        this.allAreasForCity = areas;
      },
      error: err => console.error(err)
    });
  }
}
