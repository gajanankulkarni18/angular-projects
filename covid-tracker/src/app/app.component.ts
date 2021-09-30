import { Component } from '@angular/core';
import { AppService } from './app.service';
import { State } from './components/State';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private appService: AppService) {}
  title = 'Covid-Tracker';
  searchresult: any;
  isButtonClicked: boolean;
  isCountDisplay: boolean;
  stateCount: any;
  headers = ['state_id', 'state_name'];

  ngOnInit() {}
  getStateCount() {
    this.isCountDisplay = true;
  }

  getStates() {
    this.isButtonClicked = true;
    this.appService.getStates().subscribe(
      (data: {}) => {
        console.log(data);
        this.searchresult = Object.values(data)[0];
        this.stateCount = this.searchresult.length;
      },
      (error) => {
        //Error callback
        if (error.status == 404) {
          this.searchresult = 'No data found.';
        }
      }
    );
  }
}
