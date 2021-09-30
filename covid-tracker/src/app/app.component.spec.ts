import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AppService } from './app.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let appService: AppService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AppService],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    appService = TestBed.get(AppService);
  });

  it('should not return null reponse for get States API', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const button = fixture.debugElement.query(
      By.css('#stateBtn')
    ).nativeElement;
    button.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(app.searchresult).not.toBeNull();
  });

  it('should get count of all states in India', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const button = fixture.debugElement.query(
      By.css('#stateBtn')
    ).nativeElement;
    button.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(app.searchresult.length).toEqual(37);
  });

  it('should display state count in UI with label', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
    let count = 37;
    fixture.detectChanges();
    component.stateCount = count;
    const button = fixture.debugElement.query(
      By.css('#stateBtn')
    ).nativeElement;
    button.click();
    fixture.detectChanges();
    let button1 = fixture.debugElement.query(
      By.css('#getCountBtn')
    ).nativeElement;
    button1.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('#stateCountLable')).nativeElement
        .innerHTML
    ).toBe('State Count - 37');
  });
});
