import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewrecipiesComponent } from './viewrecipies.component';

describe('ViewrecipiesComponent', () => {
  let component: ViewrecipiesComponent;
  let fixture: ComponentFixture<ViewrecipiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewrecipiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewrecipiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
