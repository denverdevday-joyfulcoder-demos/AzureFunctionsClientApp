import { Component } from '@angular/core';
import { DataAccessService } from '../services/data-access.service';

@Component({
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent {

  valueList = [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}];
  errorMessage: string;
  imageSrc: string;
  private path = '../assets/images';

  constructor(private dataAccessService: DataAccessService) { }

  getRating() {
    this.errorMessage = '';
    const scores = this.valueList.map(item => {
      return item.value / 10;
    });
    this.dataAccessService.getRatingForList(scores)
      .subscribe(rating => {
        switch (rating) {
          case 'good':
            this.imageSrc = `${this.path}/good.png`;
            break;
          case 'bad':
            this.imageSrc = `${this.path}/bad.png`;
            break;
          case 'ugly':
            this.imageSrc = `${this.path}/ugly.jpg`;
            break;
        }
      },
        error => {
          this.errorMessage = error;
        });
  }
}
