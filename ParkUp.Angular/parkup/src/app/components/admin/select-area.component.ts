import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Area } from '../../models/Area';
import { AreasService } from '../../services/areas.service';

@Component({
  selector: 'app-select-area',
  templateUrl: './select-area.component.html',
  styleUrls: ['./select-area.component.css']
})
export class SelectAreaComponent implements OnInit {
  @Output() userSelectedArea: EventEmitter<any> = new EventEmitter();

  selectedArea: string;
  allAreasForCity: Area[];

  constructor(private areasService: AreasService) { }

  ngOnInit(): void {
    this.areasService.getAllAreasForCity('3').subscribe({
      next: areas => {
        this.allAreasForCity = areas;
      },
      error: err => console.error(err)
    });
  }

  onAreaChange() {
    console.log(`area changed? - selected Area: ${this.selectedArea}`);
    this.userSelectedArea.emit(this.selectedArea)
  }

}
