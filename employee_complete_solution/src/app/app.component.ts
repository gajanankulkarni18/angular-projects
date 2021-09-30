import { Component, Optional, Self } from '@angular/core';
import { AppService } from './app.service';
import { Employee } from './employee';
import { ActivatedRoute, RouterOutlet, Router } from '@angular/router'; 
import { FormControl, FormGroup,NgControl} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  title = 'Employee';
  public searchid:any ;
  public searchresult :any;
  public names:any =[];

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(@Optional() @Self() public ngControl: NgControl, private appService: AppService,
  private activatedRoute: ActivatedRoute ,  private datePipe:DatePipe, ) {
   this.searchid='';
  }
  ngOnInit() {
  }
  getEmpById(){
    
    if(this.searchid === '' || this.searchid == 0)
    {
      this.searchresult = "No data found.";
    }
    else{
    this.appService.searchById(this.searchid)
    .subscribe((data: {}) => {
      this.searchresult = Object.values(data)[1];
    },(error) => {                              //Error callback
      if(error.status == 404)
      {
        this.searchresult = "No data found.";
      }
      
    })
    
  }
  }
  getEmpByDOB(){
    let start_dates_str:any =Object.values(this.dateRange.value)[0];
    let end_dates_str:any=Object.values(this.dateRange.value)[1];
     this.appService.searchByDOB(this.datePipe.transform(start_dates_str,"YYYY/MM/dd"),this.datePipe.transform(end_dates_str,"YYYY/MM/dd"))
     .subscribe((data: {}) => {
        this.names=Object.values(data);
        let empnames:any='';
        this.names.forEach(function (e:any) {
          empnames = empnames +e.EmpName+" ";
        });
        if(empnames === '')
        {
          this.searchresult="No data found."}
        else{
        this.searchresult=empnames;
        }
      },(error) => {                              //Error callback
        if(error.status == 404)
        {
          this.searchresult = "No data found.";
        }
      })
  }
}
