import { ComponentFixture,TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { DebugElement  } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el:HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatDatepickerModule, 
        MatFormFieldModule, 
        MatNativeDateModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [ DatePipe,],
    }).compileComponents();
  });

  beforeEach(async ()=>{
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should get employee name by entering employee id', async() => {
    await fixture.whenStable();
    fixture.detectChanges();
    let id=111;
    fixture.detectChanges();
    component.searchid= id;
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('#btnsearchbyId')).nativeElement;
    button.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#searchresult')).nativeElement.innerHTML).toBe('Kunjal');
  }); 
  it('should get employee name by entering wrong employee id', () => {
    let id=160;
    let eidtext  = fixture.debugElement.query(By.css('#searchid')).nativeElement;
    eidtext.value=id;
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('#btnsearchbyId')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#searchresult')).nativeElement.innerHTML).toBe('No data found.');
  }); 
  it('should get employee names by entering employee DOB',async () => {
    let startDate='1980/1/1';
    let endDate='1985/1/1';
    component.dateRange.setValue({
      start: startDate,
      end:endDate,
    });
    await fixture.whenStable();
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('#searchByDOB')).nativeElement;
    button.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#searchresult')).nativeElement.innerHTML.trim()).toBe('Kunjal Pankaj Roshni');
  });

  it('should get employee names by entering employee wrong DOB', async() => {
    let startDate='1986/12/25';
    let endDate='1990/1/1';
    component.dateRange.setValue({
      start: startDate,
      end:endDate,
    });
    await fixture.whenStable();
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('#searchByDOB')).nativeElement;
    button.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.searchresult).toEqual('No data found.');
  });
});