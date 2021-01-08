import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  takenSpaces: any[];

  constructor() { }

  ngOnInit(): void {
    // temp hardcoded
    this.takenSpaces = [
      { 'id': 1, 'name': 'test' },
      { 'id': 2, 'name': 'test2' },
      { 'id': 3, 'name': 'test3' }
      ];
  }

}
