import { Component } from '@angular/core';
import { DataAccessService } from '../services/data-access.service';

@Component({
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {

  score = 0;
  errorMessage: string;
  imageSrc: string;
  private path = '../assets/images';

  constructor(private dataAccessService: DataAccessService) { }

  getRating() {
    this.errorMessage = '';
    this.dataAccessService.getRating(this.score / 10)
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
