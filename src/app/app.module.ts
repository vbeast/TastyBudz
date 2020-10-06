import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {NgxWebstorageModule} from "ngx-webstorage";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SignupComponent } from './signup/signup.component';
import { SiginComponent } from './sigin/sigin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipecardComponent } from './recipecard/recipecard.component';
import { ViewrecipiesComponent } from './viewrecipies/viewrecipies.component';
import { MenuComponent } from './menu/menu.component';
import { from } from 'rxjs';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RecipeCarouselComponent } from './recipe-carousel/recipe-carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignupComponent,
    SiginComponent,
    HomepageComponent,
    RecipecardComponent,
    ViewrecipiesComponent,
    MenuComponent,
    ProfilepageComponent,
    LoadingSpinnerComponent,
    RecipeCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SlideshowModule,
    NgxWebstorageModule.forRoot(),
    SlickCarouselModule
  ],
  providers: [HomepageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
