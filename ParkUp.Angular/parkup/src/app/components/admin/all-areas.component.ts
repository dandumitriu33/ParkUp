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
