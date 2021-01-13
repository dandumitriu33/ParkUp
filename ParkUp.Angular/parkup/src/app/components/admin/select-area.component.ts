import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Area } from '../../models/Area';
import { AreasService } from '../../services/areas.service';

@Component({
  selector: 'app-select-area',
  templateUrl: './select-area.component.html',
  styleUrls: ['./select-area.component.css']
})
export class SelectAreaComponent implements OnInit, OnChanges {
  @Input() sharedCityId: string;
  @Output() userSelectedArea: EventEmitter<any> = new EventEmitter();

  selectedArea: string;
  allAreasForCity: Area[];

  constructor(private areasService: AreasService) { }

  ngOnInit(): void {
    this.areasService.getAllAreasForCity(this.sharedCityId).subscribe({
      next: areas => {
        this.allAreasForCity = areas;
      },
      error: err => console.error(err)
    });
  }

  ngOnChanges(changes: SimpleChanges):void {
    this.areasService.getAllAreasForCity(this.sharedCityId).subscribe({
      next: areas => {
        this.allAreasForCity = areas;
      },
      error: err => console.error(err)
    });
  }

  onAreaChange() {
    this.userSelectedArea.emit(this.selectedArea)
  }

}
